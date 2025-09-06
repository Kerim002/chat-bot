import { roomApi } from "@/entities/room";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export const SidebarHistory = () => {
  const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  return (
    <>
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="">
          {/* 
          <SidebarMenuItem>
            <SidebarMenuButton className="" asChild>
              <Link to="/">
                <span> That question can be interpreted</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          {rooms?.map((room) => (
            <SidebarMenuItem key={room.id}>
              <SidebarMenuButton className="" asChild>
                <Link to={`/room/${room.id}`}>
                  <span>{room.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
};
