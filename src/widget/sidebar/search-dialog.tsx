import { roomApi } from "@/entities/room";
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
import { useQuery } from "@tanstack/react-query";
import { Edit, HatGlasses, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SearchDialog = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const { data: rooms } = useQuery(roomApi.roomQueries.rooms());
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleClose = () => {
    navigate("/");
    closeRef.current?.click();
  };

  const handleNavigate = (id: number) => {
    navigate(`room/${id}`);
    closeRef.current?.click();
  };
  return (
    <Dialog>
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
          <div className="flex items-center border-b py-4 px-7">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full outline-none"
              placeholder={t("search")}
            />
            <div className="size-5">
              {searchText ? (
                <Button variant="outline">
                  <X className="text-gray-500" />
                </Button>
              ) : null}
            </div>
          </div>
          <div className="space-y-3 px-4">
            <Button
              onClick={handleClose}
              variant="ghost"
              className="w-full gap-2 font-normal justify-start"
            >
              <Edit className="size-5" />
              <p>{t("new_chat")}</p>
            </Button>
            <div className="h-52 overflow-auto  space-y-1">
              {rooms?.map((item) => (
                <Button
                  onClick={() => handleNavigate(item.id)}
                  variant="ghost"
                  className="w-full gap-2 font-normal justify-start"
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </div>

          {/* <div className="w-full h-52  flex items-center justify-center">
            <HatGlasses className="size-20 text-gray-400" />
          </div> */}
          <DialogClose ref={closeRef} />
        </DialogContent>
      </form>
    </Dialog>
  );
};
