import type { Register } from "../../types";

export type RegisterParams = Register;

export type RegisterPayload = {
  name: string;
  password: string;
};
