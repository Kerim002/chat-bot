import { jsonApiInstance } from "@/shared/api/interceptor";
import type { RegisterParams, RegisterPayload } from "./queries/register.query";
import { AUTH_ENDPOINT } from "@/shared/constants/endpoints";

export const postRegister = async (params: RegisterParams) => {
  const json: RegisterPayload = {
    name: params.name,
    password: params.password,
  };
  const result = await jsonApiInstance(`${AUTH_ENDPOINT}/register`, {
    method: "POST",
    json,
  });
  return result;
};
