import { roomApi } from "@/entities/room";
import { DeleteRoomPopover } from "@/features";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SidebarHistory = () => {
  const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  const { t } = useTranslation();

  return (
    <>
      <SidebarGroupLabel>{t("history")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="">
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
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
};
