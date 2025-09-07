import { SidebarTrigger, useSidebar } from "@/shared/ui/sidebar";

import { Scale } from "lucide-react";

export const TopSidebar = () => {
  //   const { i18n } = useTranslation();
  const { open } = useSidebar();
  return (
    <div className={`w-full h-full flex items-center justify-between`}>
      <Scale className={`${open ? "" : "hidden"}`} />
      <SidebarTrigger />
    </div>
  );
};
