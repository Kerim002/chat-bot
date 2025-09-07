import { roomApi } from "@/entities/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteRoomMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate: deleteRoomMutation, isPending } = useMutation({
    mutationFn: roomApi.deleteRoom,
    onSuccess: (_, id) => {
      //   queryClient.invalidateQueries({
      //     queryKey: roomApi.roomQueries.rooms().queryKey,
      //   });
      queryClient.setQueryData(
        roomApi.roomQueries.rooms().queryKey,
        (oldData) => {
          if (!oldData) return [];
          const newData = oldData.filter((room) => room.id !== id);
          return newData;
        }
      );
      toast.success(t("room_deleted"));
    },
    onError: () => {
      toast.error(t("room_deleted_unsuccess"));
    },
  });
  return { deleteRoomMutation, isPending };
};
