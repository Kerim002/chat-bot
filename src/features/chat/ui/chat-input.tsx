import { useEffect, useRef, useState } from "react";
import { usePromptMutation } from "../api/use-prompt-mutation";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { ArrowUp } from "@/assets";
import { useQueryParam } from "@/shared";
import { tempReturner } from "@/shared/lib/temp-returner";

type Props = {
  isMessageExist: boolean;
  onSend?: (inputValue: string) => void; // <-- onSend desteği eklendi
};

export const ChatInput = ({ isMessageExist }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { id: roomId } = useParams<{ id: string }>();
  const { getQuery } = useQueryParam();
  const { t } = useTranslation();
  // Auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 192; // 48 * 4px
      if (textareaRef.current.scrollHeight < maxHeight) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      } else {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "auto";
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, [inputValue]);
  const { isPending, promptMutation } = usePromptMutation();
  const handleSendMessage = () => {
    if (!isPending) {
      promptMutation(
        {
          userPrompt: inputValue,
          roomId: roomId ? Number(roomId) : undefined,
          temperature: tempReturner(getQuery("temp") || "normal"),
        },
        { onSuccess: () => setInputValue("") }
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`${
        isMessageExist ? "sticky bottom-0 pb-4" : ""
      } bg-sidebar mt-3 w-full pt-2`}
    >
      {/* Gradient border wrapper, only active when textarea is focused */}
      <div className="min-h-14 flex items-center justify-center p-[1px]  max-w-3xl m-auto rounded-[13px] bg-gray-300 dark:bg-neutral-700 focus-within:bg-neutral-800 ease-in transition-colors duration-300">
        <div className="flex  w-full min-h-[54px]  items-end rounded-[12px] bg-neutral-100 dark:bg-sidebar shadow-lg border border-transparent">
          {/* <ChatSettingsPopover /> */}
          {/* <Button
            variant="outline"
            className="size-9 my-[9px] rounded-lg bg-sidebar ml-1"
            size="icon"
          >
            <Paperclip />
          </Button> */}
          <textarea
            ref={textareaRef}
            id="text-input"
            className="flex-grow  my-auto resize-none bg-transparent outline-none p-2 text-base placeholder-zinc-400 rounded-xl max-h-48 overflow-y-auto"
            placeholder={t("ask_question")}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>

          <Button
            disabled={!inputValue}
            className="rounded-lg mr-1 my-[9px]"
            size="icon"
          >
            <ArrowUp />
          </Button>
          {/* <button
            id="send-button"
            className="ml-2 p-2 rounded-full main-bg  transition-colors duration-200 focus:outline-none"
            aria-label="Send message"
            onClick={handleSendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};
