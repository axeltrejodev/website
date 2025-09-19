"use client";

import { PlayIcon, SquareIcon } from "lucide-react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/uva/button";
import { Spinner } from "@/uva/spinner";

import { cn } from "@/lib/utils";

async function unpackBundle(bundleBlob: Blob) {
  const HEADER_SIZE = 8 * 4;
  const headerBuf = await bundleBlob //
    .slice(0, HEADER_SIZE)
    .arrayBuffer();
  const dv = new DataView(headerBuf);
  const sizes: number[] = [];
  let offset = 0;
  for (let i = 0; i < 4; i++) {
    let sz: bigint;
    if (typeof dv.getBigUint64 === "function") {
      sz = dv.getBigUint64(offset, true);
    } else {
      const low = BigInt(dv.getUint32(offset, true));
      const high = BigInt(dv.getUint32(offset + 4, true));
      sz = (high << 32n) + low;
    }
    sizes.push(Number(sz));
    offset += 8;
  }
  const files: Blob[] = [];
  let pos = HEADER_SIZE;
  for (let i = 0; i < 4; i++) {
    const end = pos + sizes[i];
    files.push(bundleBlob.slice(pos, end));
    pos = end;
  }
  return files;
}

async function decryptBlob(encrypted: Blob, password: string) {
  const encoder = new TextEncoder();
  const passBytes = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passBytes);
  const key = await crypto.subtle //
    .importKey("raw", hashBuffer, { name: "AES-CTR" }, false, ["decrypt"]);
  const buf = await encrypted.arrayBuffer();
  const full = new Uint8Array(buf);
  const iv = full.slice(0, 16);
  const ct = full.slice(16);
  const algorithm: AesCtrParams = { name: "AES-CTR", counter: iv, length: 64 };
  const plainBuffer = await crypto.subtle.decrypt(algorithm, key, ct.buffer);
  return new Blob([plainBuffer]);
}

async function loadBundle(bundleBlob: Blob) {
  const audioCtx = new AudioContext();
  const parts = await unpackBundle(bundleBlob);
  const buffers: AudioBuffer[] = [];
  for (const part of parts) {
    const data = await part.arrayBuffer();
    const audio = await audioCtx.decodeAudioData(data);
    buffers.push(audio);
  }
  const loop = [
    [1, 2, 3],
    [1, 2, 2, 3],
    [1, 2, 2, 2, 3],
    [1, 3],
  ].flat();
  const bundle: AudioBundle = {
    intro: buffers[0],
    loop: loop.map((i) => buffers[i]),
  };
  return { audioCtx, bundle };
}

type AudioBundle = {
  intro: AudioBuffer;
  loop: AudioBuffer[];
};

type AudioPlayerContextType = {
  isLoading: boolean;
  isPlaying: boolean;
  togglePlayback: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx)
    throw new Error("useAudioPlayer must be used within a AudioPlayerProvider");
  return ctx;
}

export function AudioPlayerProvider({
  children,
  src,
}: {
  children: ReactNode;
  src: string;
}) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const bundleRef = useRef<AudioBundle | null>(null);
  const playingNodesRef = useRef<(AudioBufferSourceNode | number)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playBuffer = (
    buffer: AudioBuffer,
    when: number,
  ): AudioBufferSourceNode => {
    const src = audioCtxRef.current!.createBufferSource();
    src.buffer = buffer;
    src.connect(gainNodeRef.current!);
    src.start(when);
    playingNodesRef.current.push(src);
    return src;
  };
  const stopPlayback = useCallback(() => {
    if (playingNodesRef.current.length > 0) {
      playingNodesRef.current.forEach((node) => {
        try {
          if (node instanceof AudioBufferSourceNode) {
            node.stop();
          } else {
            clearTimeout(node);
          }
        } catch {}
      });
      playingNodesRef.current = [];
    }
    setIsPlaying(false);
  }, []);
  const startPlayback = useCallback(() => {
    if (!audioCtxRef.current || !bundleRef.current) return;
    const [audioCtx, bundle] = [audioCtxRef.current, bundleRef.current];
    stopPlayback();
    const now = audioCtx.currentTime;
    let t = now;
    playBuffer(bundle.intro, t);
    t += bundle.intro.duration;
    const scheduleLoop = (baseTime: number) => {
      let time = baseTime;
      for (const buf of bundle.loop) {
        playBuffer(buf, time);
        time += buf.duration;
      }
      const timeoutId = window.setTimeout(
        () => scheduleLoop(time),
        (time - audioCtx.currentTime - 0.05) * 1000,
      );
      playingNodesRef.current.push(timeoutId);
    };
    scheduleLoop(t);
    setIsPlaying(true);
  }, [stopPlayback]);
  const togglePlayback = useCallback(() => {
    if (isPlaying) stopPlayback();
    else startPlayback();
  }, [isPlaying, startPlayback, stopPlayback]);
  useEffect(() => {
    requestIdleCallback(async () => {
      setIsLoading(true);
      const response = await fetch(src, { priority: "low" });
      const raw = await response.blob();
      const blob = await decryptBlob(raw, "bundle");
      const { audioCtx, bundle } = await loadBundle(blob);
      audioCtxRef.current = audioCtx;
      bundleRef.current = bundle;
      gainNodeRef.current = audioCtx.createGain();
      gainNodeRef.current.connect(audioCtx.destination);
      gainNodeRef.current.gain.value = 0.5;
      setIsLoading(false);
    });
    return () => {
      stopPlayback();
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    };
  }, [src, stopPlayback]);
  return (
    <AudioPlayerContext.Provider
      value={{
        isLoading,
        isPlaying,
        togglePlayback,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function AudioPlayerButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const {
    isLoading, //
    isPlaying,
    togglePlayback,
  } = useAudioPlayer();
  return (
    <Button
      size="icon"
      variant="surface"
      className={cn("rounded-full", className)}
      disabled={isLoading}
      onClick={togglePlayback}
      {...props}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : isPlaying ? (
        <SquareIcon fill="var(--muted-foreground)" stroke="0" />
      ) : (
        <PlayIcon fill="var(--muted-foreground)" stroke="0" />
      )}
    </Button>
  );
}
