import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import React from "react";
import { TopSidebar } from "./top-sidebar";
import { Edit } from "lucide-react";
import { SidebarHistory } from "./sidebar-history";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarFoot } from "./sidebar-footer";
import { SearchDialog } from "../../features/sidebar/dialog/search-dialog";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className="bg-sidebar" collapsible="icon" {...props}>
      <SidebarHeader className="h-16">
        <TopSidebar />
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup className="mb-4">
          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <Link onClick={toggleSidebar} to={`/${search}`}>
                  <SidebarMenuButton className="" asChild>
                    <div>
                      <Edit className="size-5" />
                      <span>{t("new_chat")}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SearchDialog />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarHistory />
      </SidebarContent>
      <SidebarFoot />
    </Sidebar>
  );
};
