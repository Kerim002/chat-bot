export type Room = {
  id: number;
  title: string;
  userId: number;
  createdAt: string;
};

export type RoomPagination = {
  items: Room[];
  hasNext: boolean;
};
