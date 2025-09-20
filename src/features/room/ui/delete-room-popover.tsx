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
  const { mutate } = useDeleteRoomMutation();
  const { open } = useSidebar();
  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`
            ${open ? "size-6" : "hidden"}
            ellipsis
          `}
        >
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="w-fit p-1">
        <Button variant="destructive" onClick={() => handleDelete(id)}>
          <Trash className="mr-2" />
          {t("delete")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
