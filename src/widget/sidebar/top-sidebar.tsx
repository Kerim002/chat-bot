import { Button } from "@/shared/ui/button";
import { SidebarTrigger, useSidebar } from "@/shared/ui/sidebar";

import { Brain } from "lucide-react";

export const TopSidebar = () => {
  //   const { i18n } = useTranslation();
  const { open, toggleSidebar } = useSidebar();
  return (
    <div className={`w-full group h-full flex items-center justify-between`}>
      <Button
        onClick={() => toggleSidebar()}
        className={`${
          open ? "size-7" : "w-full  hidden group-hover:inline-flex"
        }`}
        variant="ghost"
      >
        <Brain className="size-6" />
      </Button>
      <SidebarTrigger
        className={`${open ? "" : "w-full group-hover:hidden"}`}
      />
    </div>
  );
};
