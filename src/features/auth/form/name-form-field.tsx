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
};

export const NameFormField = <T extends FieldValues>({
  form,
  name,
}: Props<T>) => {
  const { t } = useTranslation();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("username")}</FormLabel>
          <FormControl className="w-full">
            <Input
              autoComplete="off"
              type="text"
              className="w-full "
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
