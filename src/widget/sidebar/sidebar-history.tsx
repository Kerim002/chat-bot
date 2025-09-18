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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const SidebarHistory = () => {
  const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  const { t } = useTranslation();
  const { open } = useSidebar();

  return (
    <SidebarGroup
      className={`scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800  ${
        open ? "overflow-auto" : "hidden"
      } [direction:rtl] [&>*]:[direction:ltr]`}
    >
      <SidebarGroupLabel>{t("history")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {rooms?.map((item, i) => (
            <SidebarMenuItem
              key={i}
              data-index={i}
              className="flex items-center justify-between group"
            >
              <SidebarMenuButton asChild>
                <Link to={`/room/${item.id}`}>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              <DeleteRoomPopover id={i} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
