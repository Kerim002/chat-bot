import { roomApi } from "@/entities/room";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, MessageSquare, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SidebarHistory = () => {
  const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  const { t } = useTranslation();
  const { open } = useSidebar();
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={`${open ? "" : "hidden"}`} variant="ghost">
                    <EllipsisVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="sm:align-end w-fit align-center p-1"
                >
                  <div className="">
                    <Button variant="ghost">
                      <Trash />
                      {t("delete")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
};
