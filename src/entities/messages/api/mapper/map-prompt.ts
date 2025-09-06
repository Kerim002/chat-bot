import type { Prompt } from "../../model/prompt";
import type { PromptDto } from "../dto/prompt.dto";

export const mapPrompt = (dto: PromptDto): Prompt => ({
  chatroomId: dto.metadata.chatroom_id,
  chatroomTitle: dto.metadata.chatroom_title,
  generatedResponse: dto.generated_response,
  userId:dto.metadata.user_id
});
