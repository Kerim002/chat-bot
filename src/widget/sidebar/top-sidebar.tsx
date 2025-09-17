import { SidebarTrigger, useSidebar } from "@/shared/ui/sidebar";
import { Scale } from "lucide-react";

export const TopSidebar = () => {
  const { open } = useSidebar();

  return (
    <div className="w-full h-full flex items-center justify-between px-3">
      {/* Sol taraf: ikon + kullanıcı adı */}
      <div className="flex items-center gap-2">
        {open && <Scale className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
        {open && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Emeli Aň
          </span>
        )}
      </div>

      {/* Sağ taraf: Sidebar trigger */}
      <SidebarTrigger />
    </div>
  );
};
