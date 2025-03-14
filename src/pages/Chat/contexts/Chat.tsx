import { createContext, ReactNode, useState } from "react";
import chat from "../services/chat";
import formatTime from "../utils/formatTime";
import { Message } from "../types";

export type ChatContextType = {
  messages: Message[];
  thinking: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export default ChatContext;

type Props = {
  children: ReactNode;
};

export function ChatProvider({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  async function sendMessage(content: string) {
    const newMessages = [
      ...messages,
      {
        incoming: false,
        content: content,
        time: formatTime(),
      },
    ];
    setMessages(newMessages);
    setThinking(true);
    const response = await chat(newMessages);
    setThinking(false);
    setMessages((prevState) => [...prevState, response]);
  }
  function clearChat() {
    setMessages([]);
  }
  return (
    <ChatContext.Provider
      value={{
        messages,
        thinking,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
