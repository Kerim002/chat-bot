import { authApi } from "@/entities/auth";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";

export const AppNavbar = () => {
  // const { t, i18n } = useTranslation();
  useQuery(authApi.authQueries.protected());
  // const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16  flex justify-between  items-center px-3 ">
      <SidebarTrigger className="block md:hidden" />
      <h2 className="text-lg font-medium">Emeli an</h2>
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
