import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getMessages } from "./get.messages";

export const messageQueries = {
  all: () => ["message"],
  messages: (id: number) =>
    queryOptions({
      queryKey: [...messageQueries.all(), "list"],
      queryFn: () => getMessages(id),
      placeholderData: keepPreviousData,
    }),
};
