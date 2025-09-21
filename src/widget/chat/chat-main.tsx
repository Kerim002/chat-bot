import { messagesApi } from "@/entities/messages";
import { useChatStore } from "@/entities/room/hooks/use-chat-store";
import { ChatInput } from "@/features/chat/ui/chat-input";
import { MessageItem } from "@/features/chat/ui/message";
import { Skeleton } from "@/shared/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const ChatMain = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { oldText } = useChatStore();
  const { data: messages, isLoading: queryLoading } = useQuery(
    messagesApi.messageQueries.messages(Number(id))
  );
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
      className={`w-full   scrollbar-thin overflow-auto transition-all  h-[calc(100dvh-64px)] ease-out duration-75 flex flex-col  font-inter
      [scrollbar-width:thin] 
             [scrollbar-color:theme(colors.gray.400)_transparent] 
             [&::-webkit-scrollbar]:w-1.5 
             [&::-webkit-scrollbar-track]:bg-transparent 
             [&::-webkit-scrollbar-thumb]:bg-gray-400 
             [&::-webkit-scrollbar-thumb]:rounded-full
      
      `}
    >
      <div
        className={`flex max-w-4xl m-auto flex-col flex-grow w-full justify-center   mx-auto px-4`}
      >
        {queryLoading ? (
          <div
            className={`flex max-w-4xl  pb-4 m-auto h-full flex-col flex-grow w-full justify-center mx-auto px-4`}
          >
            <div className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
              <MessageItem
                roomId={0}
                createdAt="test"
                prompt={oldText}
                isStreaming={false}
                id={0}
                isUser={true}
              />
              <div className="">
                <Skeleton className="sm:w-lg w-full h-10 rounded-xl" />
              </div>
            </div>
          </div>
        ) : null}

        {messages?.length ? (
          <>
            <main className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
              {messages.map((message, idx) => {
                const isLast = idx === messages.length - 1 && !message.isUser;
                const createdAtTime = new Date(message.createdAt).getTime();
                const isRecent = Date.now() - createdAtTime <= 10_000;
                console.log(id, isLast, isRecent);
                return (
                  <MessageItem
                    key={message.id}
                    {...message}
                    prompt={message.prompt}
                    isStreaming={isLast && isRecent}
                  />
                );
              })}
              {isLoading ? (
                <div className="">
                  <Skeleton className="sm:w-lg w-full h-10 rounded-xl" />
                </div>
              ) : null}
            </main>
          </>
        ) : null}

        <ChatInput
          setIsLoading={setIsLoading}
          isMessageExist={messages?.length ? true : false}
        />
      </div>
    </div>
  );
};
