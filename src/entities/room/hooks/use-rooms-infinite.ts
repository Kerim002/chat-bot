// hooks/use-rooms-infinite.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRoom } from "../api/get.room";
import type { RoomsQuery } from "../api/query/room-query";

export const useRoomsInfinite = (params: Omit<RoomsQuery, "offset">) => {
  const { limit = 20, search } = params;

  return useInfiniteQuery({
    queryKey: ["rooms", { limit, search }],
    queryFn: ({ pageParam = 0 }) =>
      getRoom({ limit, offset: pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNext) return undefined;
      return allPages.length * limit; // next offset
    },
  });
};
