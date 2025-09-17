import type { Message } from "@/entities/messages/types";
import { Scale, User } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";

type Props = Message & { isStreaming: boolean };

export const MessageItem = ({
  id,
  isUser,
  prompt,
  createdAt,
  isStreaming,
}: Props) => {
  const [displayedText, setDisplayedText] = useState(isStreaming ? "" : prompt);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    let i = 0;
    setDisplayedText(prompt[0] || "");
    const interval = setInterval(() => {
      if (i < prompt.length - 1) {
        i++;
        setDisplayedText((prev) => prev + prompt[i]);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isStreaming, prompt]);

  return (
    <div
      key={id}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-col">
        <div className={`w-full mb-2 flex ${isUser ? "justify-end" : ""}`}>
          <div className="flex-shrink-0 w-8 h-8 shadow-md rounded-full bg-sidebar text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-sm font-bold">
            {isUser ? <User /> : <Scale />}
          </div>
        </div>
        <div
          className={`p-3 rounded-xl text-sm md:text-base shadow-md max-w-full markdown ${
            isUser
              ? "main-bg text-white rounded-tr-xs"
              : "bg-sidebar rounded-tl-xs"
          }`}
        >
          {isUser ? (
            <p>{prompt}</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayedText}
            </ReactMarkdown>
          )}
        </div>
        <div
          className={`text-xs text-zinc-400 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(createdAt)}
        </div>
      </div>
    </div>
  );
};

const formatTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
