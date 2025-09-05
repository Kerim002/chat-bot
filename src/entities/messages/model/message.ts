export type Message = {
  id: number;
  isUser: boolean;
  roomId: number;
  prompt: string;
  createdAt: string;
};
