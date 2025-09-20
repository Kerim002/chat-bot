import { jsonApiInstance } from "@/shared/api/interceptor";
import { ROOM_ENDPOINT } from "@/shared/constants/endpoints";
import type { RoomDto } from "./dto/room.dto";
import { mapRoom } from "./mapper/map-room";
import type { RoomsQuery } from "./query/room-query";
import type { RoomPagination } from "../types";

export const getRoom = async (params: RoomsQuery): Promise<RoomPagination> => {
  const result = await jsonApiInstance<RoomDto>(`${ROOM_ENDPOINT}s`, {
    method: "GET",
    params,
  });
  return {
    hasNext: result.has_next,
    items: result.rooms.map(mapRoom),
  };
};
