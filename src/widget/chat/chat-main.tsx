import { ChatInput } from "@/features/chat/ui/chat-input";
import { Message } from "@/features/chat/ui/message";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "server";
  timestamp: string;
};

export const ChatMain = () => {
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: 1,
    //   text: "What are the differences between a black hole and a wormhole?",
    //   sender: "user",
    //   timestamp: "10:30 AM",
    // },
    // {
    //   id: 2,
    //   text: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape. A wormhole, on the other hand, is a hypothetical shortcut through spacetime that could connect two distant points. Unlike a black hole, a wormhole is not a point of no return; theoretically, an object could pass through it.",
    //   sender: "server",
    //   timestamp: "10:31 AM",
    // },
    // {
    //   id: 3,
    //   text: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape. A wormhole, on the other hand, is a hypothetical shortcut through spacetime that could connect two distant points. Unlike a black hole, a wormhole is not a point of no return; theoretically, an object could pass through it.",
    //   sender: "user",
    //   timestamp: "10:31 AM",
    // },
    // {
    //   id: 4,
    //   text: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape. A wormhole, on the other hand, is a hypothetical shortcut through spacetime that could connect two distant points. Unlike a black hole, a wormhole is not a point of no return; theoretically, an object could pass through it.",
    //   sender: "server",
    //   timestamp: "10:31 AM",
    // },
    // {
    //   id: 5,
    //   text: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape. A wormhole, on the other hand, is a hypothetical shortcut through spacetime that could connect two distant points. Unlike a black hole, a wormhole is not a point of no return; theoretically, an object could pass through it.",
    //   sender: "user",
    //   timestamp: "10:31 AM",
    // },
    // {
    //   id: 6,
    //   text: "A black hole is a region of spacetime where gravity is so strong that nothing—not even light—can escape. A wormhole, on the other hand, is a hypothetical shortcut through spacetime that could connect two distant points. Unlike a black hole, a wormhole is not a point of no return; theoretically, an object could pass through it.",
    //   sender: "server",
    //   timestamp: "10:31 AM",
    // },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (chatWindowRef.current) {
  //     chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  //   }
  // }, [messages]);
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: inputValue.trim(),
        sender: "user",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newUserMessage]);
      setInputValue("");

      const fullResponseText =
        "I received your message! This is a simple placeholder response to show the chat functionality.";

      const newGeminiMessageId = messages.length + 2;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newGeminiMessageId,
          text: "",
          sender: "server",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      let i = 0;
      const interval = setInterval(() => {
        if (i < fullResponseText.length) {
          setMessages((prevMessages) => {
            const updatedMessages = prevMessages.map((msg) =>
              msg.id === newGeminiMessageId
                ? { ...msg, text: msg.text + fullResponseText.charAt(i) }
                : msg
            );
            return updatedMessages;
          });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  };

  return (
    <div
      ref={chatWindowRef}
      className={` w-full  overflow-auto transition-all ${
        messages.length ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh-304px)]"
      }  ease-out duration-300 flex flex-col  font-inter`}
    >
      {/* Main Application Container */}
      <div
        className={`flex   max-w-5xl m-auto flex-col flex-grow w-full justify-center   mx-auto px-4`}
      >
        {/* Header/Title Section */}
        {!messages.length ? (
          <header className="flex-none text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-500">
              Hello, how can I help you today?
            </h1>
          </header>
        ) : null}

        {messages.length ? (
          <main className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
            {messages.map((message) => (
              <Message key={message.id} {...message} />
            ))}
          </main>
        ) : null}

        {/* Input Section */}
        <ChatInput
          inputValue={inputValue}
          isMessageExist={messages.length ? true : false}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};
