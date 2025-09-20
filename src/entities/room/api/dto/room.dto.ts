export type RoomItemDto = {
  id: number;
  title: string;
  user_id: number;
  created_at: string;
};

export type RoomDto = {
  rooms: RoomItemDto[];
  has_next: boolean;
};
