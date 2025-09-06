import { messagesApi } from "@/entities/messages";
import { ChatInput } from "@/features/chat/ui/chat-input";
import { MessageItem } from "@/features/chat/ui/message";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const ChatMain = () => {
  const [inputValue, setInputValue] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useQuery(messagesApi.messageQueries.messages(99));
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={chatWindowRef}
      className={` w-full  overflow-auto transition-all ${
        messages?.length ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh-304px)]"
      }  ease-out duration-75 flex flex-col  font-inter`}
    >
      {/* Main Application Container */}
      <div
        className={`flex   max-w-5xl m-auto flex-col flex-grow w-full justify-center   mx-auto px-4`}
      >
        {/* Header/Title Section */}
        {!messages?.length ? (
          <header className="flex-none text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-500">
              Hello, how can I help you today?
            </h1>
          </header>
        ) : null}

        {messages?.length ? (
          <main className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
            {messages.map((message) => (
              <MessageItem key={message.id} {...message} />
            ))}
          </main>
        ) : null}

        {/* Input Section */}
        <ChatInput
          inputValue={inputValue}
          isMessageExist={messages?.length ? true : false}
          setInputValue={setInputValue}
          handleSendMessage={() => {}}
        />
      </div>
    </div>
  );
};
