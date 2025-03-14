import { type Message as MessageType } from "../types";

type Props = {
  message: MessageType;
};

function Message({ message }: Props) {
  return (
    <div className={`message ${message.incoming ? "incoming" : "outgoing"}`}>
      <div className="content">{message.content}</div>
      <div className="time">{message.time}</div>
    </div>
  );
}

export default Message;
