import { useContext } from "react";
import ChatContext from "../contexts/Chat";

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

export default useChat;
