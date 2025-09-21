import { messagesApi } from "@/entities/messages";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const usePromptMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    mutate: promptMutation,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: messagesApi.postMessage,
    onMutate: ({ userPrompt, roomId }) => {
      if (roomId) {
        queryClient.setQueryData(
          messagesApi.messageQueries.messages(roomId).queryKey,
          (old: any) => {
            if (!old) return [];
            return [
              ...old,
              {
                id: Date.now(),
                createdAt: new Date().toISOString(),
                prompt: userPrompt,
                isUser: true,
                roomId: roomId,
              },
            ];
          }
        );
      }
    },
    onSuccess: (data, { roomId }) => {
      // if API created a new room → update rooms cache
      if (data.chatroomId !== roomId) {
        queryClient.setQueryData<InfiniteData<any>>(
          ["rooms", { limit: 20 }],
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page, i) => {
                if (i === 0) {
                  return {
                    ...page,
                    items: [
                      {
                        id: data.chatroomId,
                        title: data.chatroomTitle,
                        userId: data.userId,
                        createdAt: new Date().toISOString(),
                      },
                      ...page.items,
                    ],
                  };
                }
                return page;
              }),
            };
          }
        );

        setTimeout(() => {
          navigate(`/room/${data.chatroomId}${search}`);
        }, 100);
      } else {
        // if posting inside existing room → update messages cache
        queryClient.setQueryData(
          messagesApi.messageQueries.messages(data.chatroomId).queryKey,
          (old: any) => {
            if (!old) return [];
            return [
              ...old,
              // {
              //   id: Date.now(),
              //   createdAt: new Date().toISOString(),
              //   prompt: userPrompt,
              //   isUser: true,
              //   roomId: data.chatroomId,
              // },
              {
                id: Date.now() + 1,
                createdAt: new Date().toISOString(),
                prompt: data.generatedResponse,
                isUser: false,
                roomId: data.chatroomId,
              },
            ];
          }
        );
      }
    },
    gcTime: 5000,
  });

  return { promptMutation, isPending, isSuccess, isError };
};
