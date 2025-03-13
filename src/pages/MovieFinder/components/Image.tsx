import { useState } from "react";

type Props = {
  src: string;
  alt: string;
};

function Image({ src, alt }: Props) {
  const [hasError, setHasError] = useState(false);
  return (
    <>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div style={{ display: "flex" }}>
          <svg viewBox="0 0 600 900">
            <rect width="600" height="900" fill="var(--background-color)" />
            <path
              d="M326.25 527.78c-2.15-4.48-3.35-9.51-3.35-14.81 0-18.97 15.38-34.35 34.35-34.35 5.3 0 10.33 1.2 14.81 3.35l-45.81 45.81Zm16.19 16.2 45.81-45.81c2.15 4.48 3.35 9.51 3.35 14.81 0 18.97-15.38 34.35-34.35 34.35-5.3 0-10.33-1.2-14.81-3.35Zm14.81 26.25c31.62 0 57.25-25.63 57.25-57.25s-25.63-57.25-57.25-57.25S300 481.36 300 512.98s25.63 57.25 57.25 57.25Zm-76.82-34.36H208.41V352.67h114.5v45.8h45.8v35.16c8.09 1.16 15.78 3.52 22.9 6.9V387.02l-57.25-57.25H196.94c-6.31 0-11.43 5.09-11.43 11.36V547.42c0 6.15 5.09 11.36 11.37 11.36h94.59c-4.83-6.92-8.59-14.63-11.05-22.9Z"
              fill="var(--secondary-color)"
            />
          </svg>
        </div>
      )}
    </>
  );
}

export default Image;
