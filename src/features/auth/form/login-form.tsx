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
import { useLoginMutation } from "../api/use-login-mutation";
import { useTranslation } from "react-i18next";
export const LoginForm = () => {
  const form = useForm<Login>({ resolver: zodResolver(LoginSchema) });
  const { isPending, loginMutation } = useLoginMutation();
  const { t } = useTranslation();
  const submit: SubmitHandler<Login> = (value) => {
    loginMutation(value);
  };
  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6")}>
        <h1 className="text-4xl text-center font-semibold">Sanly an</h1>
        <Card className="rounded-2xl px-10 py-10">
          <CardHeader className="p-0">
            <CardTitle className="hidden" />
            <CardDescription>{t("login_subtitle")}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={form.handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <NameFormField form={form} name="name" />
                <PasswordFormField form={form} name="password" showForgot />
                <ImageFormField form={form} name="captchaId" />
                <SolutionFormField form={form} name="captchaSolution" />
                <div className="flex flex-col gap-3">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full text-white"
                  >
                    {t("login")}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};
