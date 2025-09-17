import { deleteAuthCookies } from "@/shared/lib/cookies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { Languages, LogOut, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export const SidebarFoot = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteAuthCookies();
    navigate("/sign-in");
  };
  const { t } = useTranslation();
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
                onClick={handleLogout}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Languages />
                  {t("language")}
                </div>

                <p className="text-sm text-gray-500">Turkmen</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-2">
                  <Sun />
                  {t("theme")}
                </div>

                <p className="text-sm text-gray-500">Dark</p>
              </DropdownMenuItem>
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
