import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/ui/sidebar";
import React from "react";
import { TopSidebar } from "./top-sidebar";
import { Edit, Home } from "lucide-react";
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
                <SidebarMenuButton
                  className="main-bg text-white hover:text-gray-50 active:text-white"
                  asChild
                >
                  <div>
                    <Edit className="size-5" />
                    <span>New chat</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <SidebarMenuButton className="" asChild>
                  <Link to="/">
                    <span>Createing a responsive sidebar...</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="" asChild>
                  <Link to="/">
                    <span> That question can be interpreted</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
};
