import { roomApi } from "@/entities/room";
import { DeleteRoomPopover } from "@/features";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SidebarHistory = () => {
  // const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  const { t } = useTranslation();
  const { open } = useSidebar();
  return (
    <SidebarGroup
      className={` scrollbar ${
        open ? "overflow-auto" : "hidden"
      } [direction:rtl] [&>*]:[direction:ltr]`}
    >
      <SidebarGroupLabel>{t("history")}</SidebarGroupLabel>
      <SidebarGroupContent>
        {/* <SidebarMenu className="">
          {rooms?.map((room) => (
            <SidebarMenuItem
              className="flex items-center justify-between"
              key={room.id}
            >
              <SidebarMenuButton className="" asChild>
                <Link to={`/room/${room.id}`}>
                  <MessageSquare className="text-sm size-4" />
                  <span>{room.title}</span>
                </Link>
              </SidebarMenuButton>
              <DeleteRoomPopover id={room.id} />
            </SidebarMenuItem>
          ))} */}
        <SidebarMenu>
          {Array.from({ length: 30 }).map((_, i) => (
            <SidebarMenuItem
              key={i}
              data-index={i}
              className="flex items-center justify-between group"
            >
              <SidebarMenuButton asChild>
                <Link to={`/room`}>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates, nam!
                  </span>
                </Link>
              </SidebarMenuButton>

              {/* The popover button will only show when THIS item is hovered */}
              <DeleteRoomPopover id={i} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
