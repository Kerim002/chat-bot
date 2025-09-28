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
  useSidebar,
} from "@/shared/ui/sidebar";
import { LogOut, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SettingsDialog } from "../../features/sidebar/dialog/settings-dialog";
import { useQueryParam } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { authQueries } from "@/entities/auth/api";
export const SidebarFoot = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteAuthCookies();
    navigate("/sign-in");
  };
  const { t } = useTranslation();
  const { setQuery } = useQueryParam();
  const { data } = useQuery(authQueries.protected());
  const {open, } = useSidebar()
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="select-none  p-0 group-data-[collapsible=icon]:p-0!">
                <div className={`${open ? "" : "size-7 flex items-center justify-center"}`}>

                <div className="bg-teal-500 size-6 rounded-full"></div>
                </div>
                {
                  open ? 
                  <h4>{data?.name}</h4> : null
                }
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-60">
              <DropdownMenuItem
                onClick={() => setQuery([{ key: "settings", value: "open" }])}
                className=""
              >
                <Settings className="" />
                <p className="">{t("settings")}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="" onClick={handleLogout}>
                <LogOut className="" />
                <p className="">{t("logout")}</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SettingsDialog />
    </SidebarFooter>
  );
};
