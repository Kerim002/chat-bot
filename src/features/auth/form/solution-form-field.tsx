import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { HatGlasses } from "lucide-react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const SolutionFormField = <T extends FieldValues>({
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
          <FormControl className="w-full">
            {/* <Input
              autoComplete="off"
              type="text"
              className="w-full "
              {...field}
            /> */}
            <div className="relative flex items-center">
              <HatGlasses className="absolute left-2 text-gray-400" />
              <Input
                autoComplete="off"
                type="text"
                className="pl-10 h-12"
                placeholder={t("solution")}
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
