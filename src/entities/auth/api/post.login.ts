import { jsonApiInstance } from "@/shared/api/interceptor";
import type { LoginParams, LoginPayload } from "./queries/login.query";
import { AUTH_ENDPOINT } from "@/shared/constants/endpoints";
import { type LoginDto } from "./dto/login.dto";

export const postLogin = async (params: LoginParams) => {
  const json: LoginPayload = {
    captcha_id: params.captchaId,
    captcha_solution: params.captchaSolution,
    user: {
      name: params.name,
      password: params.password,
    },
  };
  const result = await jsonApiInstance<LoginDto>(`${AUTH_ENDPOINT}/login`, {
    method: "POST",
    json,
  });
  return result;
};
