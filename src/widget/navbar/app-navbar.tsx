import { authApi } from "@/entities/auth";
import { useQueryParam } from "@/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/select";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, RotateCw, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AppNavbar = () => {
  const { t } = useTranslation();
  useQuery(authApi.authQueries.protected());
  // const { theme, toggleTheme } = useTheme();
  const { getQuery, setQuery } = useQueryParam();
  const handleChange = (e: string) => {
    setQuery([{ key: "temp", value: e }]);
  };
  return (
    <nav className="h-16  flex justify-between  items-center px-3 ">
      <SidebarTrigger className="block md:hidden" />
      <Select onValueChange={handleChange} value={getQuery("temp") || "normal"}>
        <SelectTrigger className="outline-none border-none shadow-none">
          {/* <SelectValue placeholder="Select a fruit" /> */}
          <p>{t("ai")}</p>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fast">
            <Zap />
            {t("fast")}
          </SelectItem>
          <SelectItem value="normal">
            <RotateCw />
            {t("normal")}
          </SelectItem>
          <SelectItem value="clever">
            <Lightbulb />
            {t("clever")}
          </SelectItem>
        </SelectContent>
      </Select>
      {/* <div className=" w-fit md:w-full flex items-center justify-between">
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
      </div> */}
    </nav>
  );
};
