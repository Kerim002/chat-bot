import type z from "zod";
import { LoginSchema } from "./login.contract";
import { RegisterSchema } from "./register.contract";

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
