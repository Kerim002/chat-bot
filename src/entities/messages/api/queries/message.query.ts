export type MessageQuery = {user_prompt: string,
  room_id?: number,
  temperature: 0.7,
  max_tokens: 500,
  top_k: 3,
  similarity_threshold: 0.3}

export type MessageParams = {
    roomId?:number
    userPrompt:string
}