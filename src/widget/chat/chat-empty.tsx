import { ChatInput } from "@/features/chat/ui/chat-input";


export const ChatEmpty = () => {
 


  return (
    <div
      className={` w-full  overflow-auto transition-all ${
        "h-[calc(100dvh-304px)]"
      }  ease-out duration-75 flex flex-col  font-inter`}
    >
      <div
        className={`flex   max-w-5xl m-auto flex-col flex-grow w-full justify-center   mx-auto px-4`}
      >
        
          <header className="flex-none text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-500">
              Hello, how can I help you today?
            </h1>
          </header>


        <ChatInput
          isMessageExist={false}
        />
      </div>
    </div>
  );
};
