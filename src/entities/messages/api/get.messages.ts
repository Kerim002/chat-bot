import { jsonApiInstance } from "@/shared/api/interceptor";
import { ROOM_ENDPOINT } from "@/shared/constants/endpoints";
import { mapMessages } from "./mapper/map-message";
import type { MessagesDto } from "./dto/messages.dto";

export const getMessages = async (id: number) => {
  const result = await jsonApiInstance<MessagesDto>(
    `${ROOM_ENDPOINT}/${id}/messages`,
    {
      method: "GET",
    }
  );
  return mapMessages(result);
};
