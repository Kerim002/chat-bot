import type { Message } from "../../model/message";
import type { MessagesDto } from "../dto/messages.dto";

export const mapMessages = (dto: MessagesDto): Message[] =>
  dto?.messages?.map((message) => ({
    createdAt: message.created_at,
    id: message.id,
    isUser: message.type_user,
    prompt: message.prompt,
    roomId: message.room_id,
  })) ?? [];
