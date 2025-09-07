import { useTheme } from "@/app/layouts/theme-provider";
import { authApi } from "@/entities/auth";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AppNavbar = () => {
  const { t, i18n } = useTranslation();
  useQuery(authApi.authQueries.protected());
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 bg-sidebar flex justify-between  items-center px-3 border-b border-sidebar-border">
      <SidebarTrigger className="block md:hidden" />
      <div className=" w-fit md:w-full flex items-center justify-between">
        <Button onClick={() => toggleTheme()} variant={"ghost"}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Select
          value={i18n.language}
          onValueChange={(e) => i18n.changeLanguage(e)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ru">{t("ru")}</SelectItem>
            <SelectItem value="tk">{t("tk")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
};
