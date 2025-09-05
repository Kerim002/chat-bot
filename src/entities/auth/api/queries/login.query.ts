import type { Login } from "../../types";

export type LoginParams = Login;

export type LoginPayload = {
  user: {
    name: string;
    password: string;
  };
  captcha_solution: string;
  captcha_id: string;
};
