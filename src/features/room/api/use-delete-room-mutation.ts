import { roomApi } from "@/entities/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteRoomMutation = () => {
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
      toast.success("Successfully Room Deleted");
    },
    onError: () => {
      toast.error("Unsuccessfully Room Deleted");
    },
  });
  return { deleteRoomMutation, isPending };
};
