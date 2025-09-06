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

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar className="" collapsible="icon" {...props}>
      <SidebarHeader className="bg-white h-20">
        <TopSidebar />
      </SidebarHeader>
      <SidebarContent className="bg-white">
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
                    <span>New chat</span>
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
