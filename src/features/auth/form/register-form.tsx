import { Form } from "@/shared/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/entities/auth";
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

import type { Register } from "@/entities/auth/types";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../api/use-register-mutation";
import { useTranslation } from "react-i18next";
export const RegisterForm = () => {
  const { t } = useTranslation();
  const { isPending, registerMutation } = useRegisterMutation();
  const form = useForm<Register>({ resolver: zodResolver(RegisterSchema) });
  const submit: SubmitHandler<Register> = (value) => {
    registerMutation(value);
  };
  return (
    <Form {...form}>
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader>
            <CardTitle>{t("create_account")}</CardTitle>
            <CardDescription>{t("fill_all_inputs")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <NameFormField form={form} name="name" />
                <PasswordFormField form={form} name="password" />
                <div className="flex flex-col gap-3">
                  <Button disabled={isPending} type="submit" className="w-full">
                    {t("create_account")}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                {t("already_have_account")}
                <Link to="/sign-in" className="underline underline-offset-4">
                  {t("login")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};
