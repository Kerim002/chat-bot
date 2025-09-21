import { useTheme } from "@/app/layouts/theme-provider";

import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SettingsContent = () => {
  const { setTheme, theme } = useTheme();
  const { t, i18n } = useTranslation();
  const systemIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return (
    <div className="w-full h-full space-y-2  overflow-auto">
      <div className="">
        <p>{t("theme")}</p>
        <div className="grid grid-cols-3 gap-3 mt-2 overflow-auto">
          <Button
            onClick={() => setTheme("light")}
            variant={theme === "light" ? "secondary" : "outline"}
            className="md:col-span-1 col-span-3 flex h-24 items-center justify-center border rounded-xl flex-col text-gray-500 dark:text-gray-200 cursor-pointer"
          >
            <Sun className="size-6" />
            <p>{t("light")}</p>
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "outline"}
            onClick={() => setTheme("dark")}
            className="md:col-span-1 col-span-3 flex h-24 items-center justify-center border rounded-xl flex-col text-gray-500 dark:text-gray-200 cursor-pointer"
          >
            <Moon className="size-6" />
            <p>{t("dark")}</p>
          </Button>
          <Button
            onClick={() => setTheme(systemIsDark ? "dark" : "light")}
            variant="outline"
            className="md:col-span-1 col-span-3 flex h-24 items-center justify-center border rounded-xl flex-col text-gray-500 dark:text-gray-200 cursor-pointer"
          >
            <Monitor className="size-6" />
            <p>{t("system")}</p>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p>{t("language")}</p>
        <Select
          value={i18n.language}
          onValueChange={(e) => i18n.changeLanguage(e)}
        >
          <SelectTrigger className="w-[120px] bg-gray-100">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ru">{t("ru")}</SelectItem>
            <SelectItem value="tk">{t("tk")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
