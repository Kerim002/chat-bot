export type LoginDto = {
  message: string;
  user: {
    id: number;
    name: string;
  };
  access_token: string;
  refresh_token: string;
};
