import { z } from "zod";
export const LoginSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(3),
  captchaSolution: z.string(),
  captchaId: z.string(),
});
