export type MessageQuery = {
  user_prompt: string;
  room_id?: number;
  temperature: number;
  max_tokens: number;
  top_k: number;
  similarity_threshold: number;
};

export type MessageParams = {
  roomId?: number;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
  topK?: number;
  similarityThreshold?: number;
};
