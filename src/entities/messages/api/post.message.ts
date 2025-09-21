import { jsonApiInstance } from "@/shared/api/interceptor";
import type { MessageParams, MessageQuery } from "./queries/message.query";
import { ROOM_ENDPOINT } from "@/shared/constants/endpoints";
import { mapPrompt } from "./mapper/map-prompt";
import type { PromptDto } from "./dto/prompt.dto";

export const postMessage = async (data: MessageParams) => {
  const json: MessageQuery = {
    max_tokens: data.maxTokens || 3000,
    room_id: data.roomId ? Number(data.roomId) : undefined,
    similarity_threshold: data.similarityThreshold || 0.5,
    temperature: data.temperature || 0.7,
    top_k: data.topK || 5,
    user_prompt: data.userPrompt,
  };
  const response = await jsonApiInstance<PromptDto>(`${ROOM_ENDPOINT}-query`, {
    method: "POST",
    json,
  });
  return mapPrompt(response);
};
