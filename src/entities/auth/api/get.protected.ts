import { jsonApiInstance } from "@/shared/api/interceptor";
import { AUTH_ENDPOINT } from "@/shared/constants/endpoints";

export const getProtected = async () => {
  const result = await jsonApiInstance(
    `${AUTH_ENDPOINT}/protected
`,
    { method: "GET" }
  );
  return result;
};
