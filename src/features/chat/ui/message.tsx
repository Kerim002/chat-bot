import type { Message } from "@/entities/messages/types";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css";
import { Copy, RefreshCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Props = Message & { isStreaming: boolean };

export const MessageItem = ({ id, isUser, prompt, isStreaming }: Props) => {
  const [displayedText, setDisplayedText] = useState(isStreaming ? "" : prompt);
  const { t } = useTranslation();
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
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col">
        {/* <div className={`w-full mb-2 flex ${isUser ? "justify-end" : ""}`}>
          <div className="flex-shrink-0 w-8 h-8 shadow-md rounded-full bg-sidebar text-neutral-600 dark:text-neutral-300 flex items-center justify-center text-sm font-bold">
            {isUser ? <User /> : <Scale />}
          </div>
        </div> */}
        <div
          className={` rounded-lg text-sm md:text-base  max-w-full markdown ${
            isUser ? "bg-gray-200 dark:bg-neutral-700" : ""
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
          {/* {formatTime(createdAt)} */}
          <div>
            <Button
              onClick={() =>
                navigator.clipboard
                  .writeText(prompt)
                  .then(() => toast.success(t("copied")))
              }
              variant={"ghost"}
              size={"icon"}
            >
              <Copy className="" />
            </Button>
            {!isUser ? (
              <Button variant={"ghost"} size={"icon"}>
                <RefreshCcw />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

// const formatTime = (iso: string) => {
//   const date = new Date(iso);
//   return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// };
