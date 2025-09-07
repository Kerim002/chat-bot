import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/ui/sidebar";
import React from "react";
import { TopSidebar } from "./top-sidebar";
import { Edit } from "lucide-react";
import { SidebarHistory } from "./sidebar-history";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { t } = useTranslation();
  return (
    <Sidebar className="bg-sidebar" collapsible="icon" {...props}>
      <SidebarHeader className="h-16">
        <TopSidebar />
      </SidebarHeader>
      <SidebarContent className=" ">
        <SidebarGroup className="mb-4">
          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <Link to={"/"}>
                  <SidebarMenuButton
                    className="main-bg text-white hover:text-gray-50 active:text-white"
                    asChild
                  >
                    <div>
                      <Edit className="size-5" />
                      <span>{t("new_chat")}</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarHistory />
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
};
