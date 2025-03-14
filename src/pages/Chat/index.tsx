import { useEffect } from "react";
import Wrapper from "./components/Wrapper";
import { ChatProvider } from "./contexts/Chat";
import "./index.css";

function Chat() {
  useEffect(() => {
    document.title = "Axel Trejo - Chat";
  }, []);
  return (
    <ChatProvider>
      <Wrapper />
    </ChatProvider>
  );
}

export default Chat;
