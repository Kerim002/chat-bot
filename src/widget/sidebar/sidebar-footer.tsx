import { useTheme } from "@/app/layouts/theme-provider";
import { deleteAuthCookies } from "@/shared/lib/cookies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { Languages, LogOut, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export const SidebarFoot = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteAuthCookies();
    navigate("/sign-in");
  };
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="">
                <div className="bg-teal-500 size-6 rounded-full"></div>
                <h4>Guwancmyrat Garayew</h4>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-60">
              <DropdownMenuItem
                onClick={toggleTheme}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  {theme === "dark" ? <Sun /> : <Moon />}
                  {t("theme")}
                </div>

                <p className="text-sm text-gray-500">Dark</p>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <div className="flex items-center gap-2">
                    <Languages className="size-5 text-gray-500" />
                    {t("language")}
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("ru")}
                      className={`${
                        i18n.language === "ru" ? "bg-neutral-800" : ""
                      }`}
                    >
                      {t("ru")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("tk")}
                      className={`${
                        i18n.language === "tk" ? "bg-neutral-800" : ""
                      }`}
                    >
                      {t("tk")}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                <LogOut className="text-red-500" />
                <p className="text-red-500">{t("logout")}</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
