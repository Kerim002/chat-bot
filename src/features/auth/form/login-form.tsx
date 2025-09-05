import type { Login } from "@/entities/auth/types";
import { Form } from "@/shared/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/entities/auth";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

import { NameFormField } from "./name-form-field";
import { PasswordFormField } from "./password-form-field";
import { SolutionFormField } from "./solution-form-field";
import { ImageFormField } from "./image-form-field";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../api/use-login-mutation";
export const LoginForm = () => {
  const form = useForm<Login>({ resolver: zodResolver(LoginSchema) });
  const { isPending, loginMutation } = useLoginMutation();
  const submit: SubmitHandler<Login> = (value) => {
    loginMutation(value);
  };
  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <NameFormField form={form} name="name" />
                <PasswordFormField form={form} name="password" showForgot />
                <ImageFormField form={form} name="captchaId" />
                <SolutionFormField form={form} name="captchaSolution" />
                <div className="flex flex-col gap-3">
                  <Button disabled={isPending} type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};
