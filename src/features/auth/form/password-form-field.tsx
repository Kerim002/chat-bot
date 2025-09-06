import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
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
          <div className="flex items-center">
            <FormLabel>{t("password")}</FormLabel>
            {/* {showForgot && (
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            )} */}
          </div>
          <FormControl className="grid gap-3">
            <Input id="password" type="password" required {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
