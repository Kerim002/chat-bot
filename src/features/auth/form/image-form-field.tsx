import { authApi } from "@/entities/auth";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const ImageFormField = <T extends FieldValues>({
  form,
  name,
}: Props<T>) => {
  const { data: captcha, isPending } = useQuery(authApi.authQueries.captcha());
  useEffect(() => {
    if (captcha) {
      form.setValue(name, captcha.captchaId as PathValue<T, typeof name>);
    }
  }, [captcha, form, name]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>Solution</FormLabel>
          <FormControl className="w-full">
            {isPending ? (
              <div></div>
            ) : (
              <img src={captcha?.imageUrl} className="w-full h-32" />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
