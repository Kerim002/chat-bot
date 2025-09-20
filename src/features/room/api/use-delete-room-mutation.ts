import { roomApi } from "@/entities/room";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const useDeleteRoomMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id: idFromParam } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (roomId: number) => {
      await roomApi.deleteRoom(roomId);
      return roomId;
    },
    onMutate: async (roomId: number) => {
      await queryClient.cancelQueries({ queryKey: ["rooms", { limit: 20 }] });

      const prevData = queryClient.getQueryData<InfiniteData<any>>([
        "rooms",
        { limit: 20 },
      ]);

      // optimistic update
      queryClient.setQueryData<InfiniteData<any>>(
        ["rooms", { limit: 20 }],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.filter((r: any) => r.id !== roomId),
            })),
          };
        }
      );

      return { prevData };
    },
    onError: (_err, _roomId, ctx) => {
      if (ctx?.prevData) {
        queryClient.setQueryData(["rooms", { limit: 20 }], ctx.prevData);
      }
      toast.error(t("room_deleted_unsuccess"));
    },
    onSuccess: (_, id) => {
      if (idFromParam && idFromParam == String(id)) {
        console.log("navigate");
        navigate("/");
      }
      toast.success(t("room_deleted"));
    },
  });

  return mutation;
};
