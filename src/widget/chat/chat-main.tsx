import { messagesApi } from "@/entities/messages";
import { ChatInput } from "@/features/chat/ui/chat-input";
import { MessageItem } from "@/features/chat/ui/message";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const ChatMain = () => {
  const { id } = useParams<{ id: string }>();
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useQuery(
    messagesApi.messageQueries.messages(Number(id))
  );
  const { t } = useTranslation();
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  }, [messages]);

  return (
    <div
      ref={chatWindowRef}
      className={` w-full scrollbar-thin overflow-auto transition-all ${
        messages?.length ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh-304px)]"
      }  ease-out duration-75 flex flex-col  font-inter
      [scrollbar-width:thin] 
             [scrollbar-color:theme(colors.gray.400)_transparent] 
             [&::-webkit-scrollbar]:w-1.5 
             [&::-webkit-scrollbar-track]:bg-transparent 
             [&::-webkit-scrollbar-thumb]:bg-gray-400 
             [&::-webkit-scrollbar-thumb]:rounded-full
      
      `}
    >
      <div
        className={`flex   max-w-full m-auto flex-col flex-grow w-full justify-center   mx-auto px-4`}
      >
        {!messages?.length ? (
          <header className="flex-none text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-500">
              {t("home_title")}
            </h1>
          </header>
        ) : null}

        {messages?.length ? (
          <main className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
            {messages.map((message, idx) => {
              const isLast = idx === messages.length - 1 && !message.isUser;
              const createdAtTime = new Date(message.createdAt).getTime();
              const isRecent = Date.now() - createdAtTime <= 10_000;
              return (
                <MessageItem
                  key={message.id}
                  {...message}
                  prompt={message.prompt}
                  isStreaming={isLast && isRecent}
                />
              );
            })}
          </main>
        ) : null}

        <ChatInput isMessageExist={messages?.length ? true : false} />
      </div>
    </div>
  );
};
