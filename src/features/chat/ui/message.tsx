type Props = {
  id: number;
  sender: "user" | "server";
  text?: string;
  timestamp?: string;
};

export const Message = ({ id, sender, text, timestamp }: Props) => {
  return (
    <div
      key={id}
      className={`flex items-end gap-2  ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col">
        <div
          className={`w-full mb-2 flex ${
            sender === "user" ? "justify-end" : ""
          }`}
        >
          <div className="flex-shrink-0 w-8 h-8 shadow-md rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
            {sender === "user" ? "U" : "G"}
          </div>
        </div>
        <div
          className={`p-3 rounded-xl text-sm md:text-base shadow-md max-w-lg ${
            sender === "user"
              ? "main-bg text-white rounded-tr-xs"
              : "bg-gray-100 rounded-tl-xs"
          }`}
        >
          <p>{text}</p>
        </div>
        <div
          className={`text-xs text-zinc-400 mt-1 ${
            sender === "user" ? "text-right" : "text-left"
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};
