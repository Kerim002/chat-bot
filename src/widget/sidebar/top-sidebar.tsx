import { SidebarTrigger, useSidebar } from "@/shared/ui/sidebar";

import { Book } from "lucide-react";

export const TopSidebar = () => {
  //   const { i18n } = useTranslation();
  const { open } = useSidebar();
  return (
    <div className={`w-full flex items-center justify-between`}>
      <Book className={`${open ? "" : "hidden"}`} />
      <SidebarTrigger />
    </div>
  );
};
