import { Brain } from "@/assets";
import { SidebarTrigger, useSidebar } from "@/shared/ui/sidebar";


export const TopSidebar = () => {
  //   const { i18n } = useTranslation();
  const { open, toggleSidebar } = useSidebar();

  return (
<div className="w-full group/sidebar h-full flex items-center justify-between">
  <div
    onClick={() => toggleSidebar()}
    className={`p-1 transition-transform duration-100 ease-in  ${
      open ? "size-7" : "w-fit hidden group-hover/sidebar:inline-flex"
    }`}
  >
    <Brain onClick={() => toggleSidebar()} className="size-6" />
  </div>

  <SidebarTrigger
    className={`transition-transform duration-100 ${
      open ? "" : "w-full group-hover/sidebar:hidden"
    }`}
  />
</div>
  );
};
