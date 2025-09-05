import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRoom } from "./get.room";

export const roomQueries = {
  all: () => ["room"],
  rooms: () =>
    queryOptions({
      queryKey: [...roomQueries.all(), "list"],
      queryFn: () => getRoom(),
      placeholderData: keepPreviousData,
    }),
};
