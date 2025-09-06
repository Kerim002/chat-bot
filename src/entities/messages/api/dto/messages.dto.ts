type MessageItemDto = {
  id: number;
  type_user: boolean;
  room_id: number;
  prompt: string;
  created_at: string;
};
export type MessagesDto = {
  messages: MessageItemDto[];
  room_info: {
    room_id: number;
    title: string;
    owner_id: number;
  };
};


