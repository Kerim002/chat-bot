import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useQueryParam } from "@/shared";
import { X } from "lucide-react";
import { SettingsSidebar } from "./settings-sidebar";
import { useState } from "react";
import { SettingsContent } from "./settings-content";
import { SettingsProfile } from "./settings-profile";
import { useTranslation } from "react-i18next";

export const SettingsDialog = () => {
  const { getQuery, deleteQuery } = useQueryParam();
  const [sidebar, setSidebar] = useState("settings");
  const { t } = useTranslation();
  const onSidebar = (e: string) => {
    setSidebar(e);
  };

  return (
    <Dialog
      onOpenChange={(e) => (e ? null : deleteQuery(["settings"]))}
      open={getQuery("settings") === "open"}
      // open={true}
    >
      <DialogOverlay className="fixed inset-0 bg-transparent backdrop-blur-xs" />
      <DialogContent className="max-w-5xl p-3 gap-1 sm:max-w-4xl h-96  w-full [&>button:last-child]:hidden">
        <DialogHeader className="flex  h-fit justify-between flex-row items-center">
          <DialogTitle className="font-normal">{t("settings")}</DialogTitle>
          <DialogClose>
            <X className="text-gray-500 dark:text-gray-200" />
          </DialogClose>
        </DialogHeader>
        <div className="h-80 flex gap-5 pt-4">
          <SettingsSidebar current={sidebar} onSidebar={onSidebar} />
          {sidebar === "settings" ? (
            <SettingsContent />
          ) : sidebar === "profile" ? (
            <SettingsProfile />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
