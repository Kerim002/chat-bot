import { messagesApi } from "@/entities/messages";
import { roomApi } from "@/entities/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const usePromptMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: promptMutation, isPending } = useMutation({
    mutationFn: messagesApi.postMessage,
    onSuccess: (data, { roomId, userPrompt }) => {
      if (data.chatroomId !== roomId) {
         queryClient.setQueryData(roomApi.roomQueries.rooms().queryKey, (oldData) => {
            if(!oldData) return [];
            const newRoom = oldData.concat({id:Date.now(), title:data.chatroomTitle, userId:data.userId, createdAt: new Date(Date.now()).toDateString()})
            return newRoom
         })
        navigate(`/room/${data.chatroomId}`);
      } else {
        queryClient.setQueryData(
          messagesApi.messageQueries.messages(data.chatroomId).queryKey,
          (oldData) => {
            if (!oldData) return [];
            const newData = oldData.concat([
              {
                id: Date.now(),
                createdAt: new Date(Date.now()).toDateString(),
                prompt: userPrompt,
                isUser: true,
                roomId: data.chatroomId,
              },
              {
                id: Date.now(),
                createdAt: new Date(Date.now()).toDateString(),
                prompt: data.generatedResponse,
                isUser: false,
                roomId: data.chatroomId,
              },
            ]);
            return newData;
          }
        );
      }
    },
  });
  return { promptMutation, isPending };
};
