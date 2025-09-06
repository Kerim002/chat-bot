import z from "zod";

export const MessagingContract = z.object({
    roomId:z.string().optional(),
    userPrompt:z.string().min(1,{message:"Message cannot be empty"})
})