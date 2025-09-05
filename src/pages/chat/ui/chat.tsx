import { ChatMain } from "@/widget/chat/chat-main";

// type Message = {
//   id: number;
//   text: string;
//   sender: "user" | "gemini";
//   timestamp: string;
// };

// #854ff2

export const Chat = () => {
  return (
    <div className="w-full">
      <ChatMain />
    </div>
  );
};
