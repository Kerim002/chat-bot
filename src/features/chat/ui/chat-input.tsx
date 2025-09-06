import { useEffect, useRef, useState,} from "react";
import { usePromptMutation } from "../api/use-prompt-mutation";
import { useParams } from "react-router-dom";

type Props = {
  isMessageExist: boolean;
};

export const ChatInput = ({
  isMessageExist,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [inputValue, setInputValue] = useState("");
 const {id:roomId} = useParams<{id:string}>()
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
const {isPending, promptMutation} = usePromptMutation()
  const handleSendMessage = () => {
    if(!isPending){
      promptMutation({userPrompt:inputValue, roomId:roomId ? Number(roomId) : undefined}, {onSuccess: () => setInputValue("")})
    }
  }

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
      } bg-neutral-50 mt-3 w-full`}
    >
      {/* Gradient border wrapper, only active when textarea is focused */}
      <div className="p-[2px]  max-w-3xl m-auto rounded-full bg-gray-300 focus-within:bg-gradient-to-l focus-within:from-blue-500 focus-within:to-violet-500 ease-in transition-colors duration-300">
        <div className="flex items-end rounded-full bg-white shadow-lg border border-transparent p-1">
          <textarea
            ref={textareaRef}
            id="text-input"
            className="flex-grow resize-none bg-transparent outline-none p-2 text-base placeholder-zinc-400 rounded-xl max-h-48 overflow-y-auto"
            placeholder="Message Gemini..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>

          <button
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
          </button>
        </div>
      </div>
    </div>
  );
};
