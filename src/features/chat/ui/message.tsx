import type { Message } from "@/entities/messages/types";

type Props = Message;

export const MessageItem = ({ id, isUser, prompt, createdAt }: Props) => {
  return (
    <div
      key={id}
      className={`flex items-end gap-2  ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col">
        <div className={`w-full mb-2 flex ${isUser ? "justify-end" : ""}`}>
          <div className="flex-shrink-0 w-8 h-8 shadow-md rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
            {isUser ? "U" : "G"}
          </div>
        </div>
        <div
          className={`p-3 rounded-xl text-sm md:text-base shadow-md max-w-lg ${
            isUser
              ? "main-bg text-white rounded-tr-xs"
              : "bg-gray-100 rounded-tl-xs"
          }`}
        >
          <p>{prompt}</p>
        </div>
        <div
          className={`text-xs text-zinc-400 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {createdAt}
        </div>
      </div>
    </div>
  );
};
