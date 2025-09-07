import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { EllipsisVertical, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteRoomMutation } from "../api/use-delete-room-mutation";
import { useSidebar } from "@/shared/ui/sidebar";

type Props = {
  id: number;
};
export const DeleteRoomPopover = ({ id }: Props) => {
  const { t } = useTranslation();
  const { deleteRoomMutation } = useDeleteRoomMutation();
  const { open } = useSidebar();
  return (
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
          <Button variant="destructive" onClick={() => deleteRoomMutation(id!)}>
            <Trash />
            {t("delete")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
