import { openai } from "../../../constants";
import formatTime from "../utils/formatTime";
import { Message } from "../types";

export default async function chat(messages: Message[]): Promise<Message> {
  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: false,
    messages: messages.map((message) => ({
      role: message.incoming ? "assistant" : "user",
      content: message.content,
    })),
  });
  return {
    incoming: true,
    content: result.choices[0].message.content!,
    time: formatTime(),
  };
}
