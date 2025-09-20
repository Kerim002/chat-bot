import { InView } from "react-intersection-observer";
import { useRoomsInfinite } from "@/entities/room/hooks/use-rooms-infinite";
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
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

export const SidebarHistory = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRoomsInfinite({ limit: 20 });

  const rooms = data?.pages.flatMap((page) => page.items) ?? [];
  const { id } = useParams();
  const { t } = useTranslation();
  const { open } = useSidebar();
  const { search } = useLocation();

  if (!rooms.length) return null;

  return (
    <>
      {open ? (
        <div className="px-2">
          <hr />
        </div>
      ) : null}

      <SidebarGroup
        className={`scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-200 dark:scrollbar-track-neutral-800  ${
          open ? "overflow-auto" : "hidden"
        } [direction:rtl] [&>*]:[direction:ltr]`}
      >
        <SidebarGroupLabel>{t("history")}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {rooms.map((item, i) => (
              <SidebarMenuItem
                key={item.id}
                data-index={i}
                className="flex items-center justify-between group"
              >
                <SidebarMenuButton
                  className={`${
                    id && id == String(item.id)
                      ? "bg-neutral-200 dark:bg-neutral-700"
                      : ""
                  }`}
                  asChild
                >
                  <Link to={`/room/${item.id}${search}`}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DeleteRoomPopover id={item.id} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {hasNextPage && (
            <InView
              as="div"
              onChange={(inView) => {
                if (inView && !isFetchingNextPage && fetchNextPage) {
                  fetchNextPage();
                }
              }}
              className="flex justify-center py-2 text-sm text-neutral-500"
            >
              {isFetchingNextPage ? t("loading") : ""}
            </InView>
          )}
        </SidebarGroupContent>
      </SidebarGroup>

      {open ? (
        <div className="px-2">
          <hr />
        </div>
      ) : null}
    </>
  );
};
