import { queryOptions } from "@tanstack/react-query";
import { getCaptcha } from "./get.captcha";
import { getProtected } from "./get.protected";

export const authQueries = {
  all: () => ["auth"],
  captcha: () =>
    queryOptions({
      queryKey: [...authQueries.all(), "captcha"],
      queryFn: () => getCaptcha(),
    }),
  protected: () =>
    queryOptions({
      queryKey: [...authQueries.all(), "protected"],
      queryFn: () => getProtected(),
    }),
};
