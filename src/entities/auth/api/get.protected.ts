import { jsonApiInstance } from "@/shared/api/interceptor";
import { AUTH_ENDPOINT } from "@/shared/constants/endpoints";
import type { UserDto } from "./dto/user.dto";
import type { User } from "../model/user";

export const getProtected = async (): Promise<User> => {
  const result = await jsonApiInstance<UserDto>(
    `${AUTH_ENDPOINT}/protected
`,
    { method: "GET" }
  );
  return { name: result.name, userId: result.user_id };
};
