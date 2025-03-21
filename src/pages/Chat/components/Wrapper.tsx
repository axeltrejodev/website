import { ChangeEvent, FormEvent, useState } from "react";
import Message from "./Message";
import useChat from "../hooks/useChat";

function Wrapper() {
  const { messages, thinking, sendMessage, clearChat } = useChat();
  const [content, setContent] = useState("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(content);
    setContent("");
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newContent = e.currentTarget.value;
    setContent(newContent);
  }
  return (
    <>
      <h1>Chat with AI</h1>
      <div className="chat-wrapper">
        <div className="top">
          <section className="chat">
            {messages.map((message) => (
              <Message message={message} />
            ))}
            {thinking && (
              <div className="message thinking">
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>
            )}
          </section>
        </div>
        <form className="bottom" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type something..."
            onChange={handleChange}
            value={content}
          />
          <button type="submit">
            <i className="ri-send-plane-2-line" />
          </button>
          <button type="button" onClick={clearChat}>
            <i className="ri-delete-bin-line" />
          </button>
        </form>
      </div>
    </>
  );
}

export default Wrapper;
