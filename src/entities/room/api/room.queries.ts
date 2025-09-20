import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getRoom } from "./get.room";
import type { RoomsQuery } from "./query/room-query";

export const roomQueries = {
  all: () => ["room"],
  rooms: (params: RoomsQuery) =>
    queryOptions({
      queryKey: [...roomQueries.all(), "list", params],
      queryFn: () => getRoom(params),
      placeholderData: keepPreviousData,
    }),
};
