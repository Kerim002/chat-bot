import { InView } from "react-intersection-observer";
import { useRoomsInfinite } from "@/entities/room/hooks/use-rooms-infinite";
import { useQueryParam } from "@/shared";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { SidebarMenuButton } from "@/shared/ui/sidebar";
import { Edit, Search, X } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchDialog = () => {
  const { t } = useTranslation();
  const { getQuery, setQuery, deleteQuery } = useQueryParam();
  const searchDebounce = useDebounce(getQuery("search"), 300);
  const { search } = useLocation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRoomsInfinite({
      search: searchDebounce || undefined,
      limit: 20,
    });

  const rooms = data?.pages.flatMap((page) => page.items) ?? [];

  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    navigate(`/${search}`);
    closeRef.current?.click();
  };

  const handleNavigate = (id: number) => {
    navigate(`room/${id}${search}`);
    closeRef.current?.click();
  };

  return (
    <Dialog onOpenChange={(e) => (e ? null : deleteQuery(["search"]))}>
      <form>
        <DialogTrigger asChild>
          <SidebarMenuButton className="cursor-pointer" asChild>
            <div>
              <Search className="size-5" />
              <span>{t("search")}</span>
            </div>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogOverlay className="fixed inset-0 bg-black/0 backdrop-blur-xs" />
        <DialogContent className="w-full max-w-3xl p-0 rounded-2xl [&>button:last-child]:hidden pb-5">
          <DialogHeader>
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </DialogHeader>

          {/* search input */}
          <div className="flex items-center border-b py-4 px-7">
            <input
              onChange={(e) =>
                setQuery([{ key: "search", value: e.target.value }])
              }
              value={getQuery("search") || ""}
              className="w-full outline-none"
              placeholder={t("search")}
            />
            <div className="size-5">
              {getQuery("search") ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setQuery([{ key: "search", value: "" }])}
                >
                  <X className="text-gray-500" />
                </Button>
              ) : null}
            </div>
          </div>

          {/* results */}
          <div className="space-y-3 px-4">
            <Button
              onClick={handleClose}
              variant="ghost"
              className="w-full gap-2 font-normal justify-start"
            >
              <Edit className="size-5" />
              <p>{t("new_chat")}</p>
            </Button>

            <div className="h-52 overflow-auto flex flex-col space-y-1">
              {rooms.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  variant="ghost"
                  className="w-full gap-2 font-normal justify-start"
                >
                  <span className="truncate max-w-[420px]">{item.title}</span>
                </Button>
              ))}

              {/* Infinite scroll sentinel */}
              {hasNextPage && (
                <InView
                  as="div"
                  onChange={(inView) => {
                    if (inView && !isFetchingNextPage) {
                      fetchNextPage();
                    }
                  }}
                  className="flex justify-center py-2 text-sm text-neutral-500"
                >
                  {isFetchingNextPage ? t("loading") : ""}
                </InView>
              )}
            </div>
          </div>

          <DialogClose ref={closeRef} />
        </DialogContent>
      </form>
    </Dialog>
  );
};
