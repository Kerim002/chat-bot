import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { LockOpen } from "lucide-react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  showForgot?: boolean;
};

export const PasswordFormField = <T extends FieldValues>({
  form,
  name,
}: // showForgot,
Props<T>) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid gap-3">
          {/* <div className="flex items-center">
            <FormLabel>{t("password")}</FormLabel>
          </div> */}
          <FormControl className="grid gap-3 ">
            <div className="relative flex items-center">
              <LockOpen className="absolute left-2 text-gray-400" />
              <Input
                id="password"
                placeholder={t("password")}
                className="pl-10 h-12"
                type="password"
                required
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
