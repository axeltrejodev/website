import Markdown from "react-markdown";
import { type Message as MessageType } from "../types";

type Props = {
  message: MessageType;
};

function Message({ message }: Props) {
  return (
    <div className={`message ${message.incoming ? "incoming" : "outgoing"}`}>
      <div className="content">
        <Markdown>{message.content}</Markdown>
      </div>
      <div className="time">{message.time}</div>
    </div>
  );
}

export default Message;
