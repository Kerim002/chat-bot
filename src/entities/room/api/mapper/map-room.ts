import type { Room } from "../../model/room";
import type { RoomDto } from "../dto/room.dto";

export const mapRoom = (dto: RoomDto): Room[] =>
  dto?.rooms?.map((room) => ({
    id: room?.id,
    createdAt: room?.created_at,
    title: room?.title,
    userId: room?.user_id,
  })) ?? [];
