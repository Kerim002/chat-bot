type ContextDto = {
  title: string;
  content: string;
};
type MetadataDto = {
  model: string;
  temperature: number;
  segments_used: number;
  similarity_threshold: number;
  no_relevant_data: boolean;
  chatroom_id: number;
  chatroom_title: string;
  user_id: number;
};
export type PromptDto = {
  found_context: ContextDto[];
  generated_response: string;
  context_segments: ContextDto[];
  metadata: MetadataDto;
};
