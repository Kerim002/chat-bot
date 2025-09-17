import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import React from "react";
import { TopSidebar } from "./top-sidebar";
import { Edit, Search } from "lucide-react";
import { SidebarHistory } from "./sidebar-history";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarFoot } from "./sidebar-footer";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useTranslation();
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
                <Link to={"/"}>
                  <SidebarMenuButton className="" asChild>
                    <div>
                      <Edit className="size-5" />
                      <span>{t("new_chat")}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to={"/"}>
                  <SidebarMenuButton className="" asChild>
                    <div>
                      <Search className="size-5" />
                      <span>{t("search")}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-2">
          <hr />
        </div>
        <SidebarHistory />
        <div className="px-2">
          <hr />
        </div>
      </SidebarContent>
      <SidebarFoot />
    </Sidebar>
  );
};
