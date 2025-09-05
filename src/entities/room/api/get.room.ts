import { jsonApiInstance } from "@/shared/api/interceptor";
import { ROOM_ENDPOINT } from "@/shared/constants/endpoints";
import type { RoomDto } from "./dto/room.dto";
import { mapRoom } from "./mapper/map-room";

export const getRoom = async () => {
  const result = await jsonApiInstance<RoomDto>(`${ROOM_ENDPOINT}s`, {
    method: "GET",
  });
  return mapRoom(result);
};
