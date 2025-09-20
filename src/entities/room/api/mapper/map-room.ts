import type { Room } from "../../model/room";
import type { RoomItemDto } from "../dto/room.dto";

export const mapRoom = (dto: RoomItemDto): Room => {
  const { created_at, id, title, user_id } = dto;
  return {
    id: id,
    createdAt: created_at,
    title: title,
    userId: user_id,
  };
};
