import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppNavbar } from "@/widget/navbar/app-navbar";
import { AppSidebar } from "@/widget/sidebar/app-sidebar";

import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background w-full h-screen">
        <AppNavbar />
        {/* <SidebarTrigger /> */}
        {/* <Outlet /> */}
      </main>
      {/* <SidebarInset>
        <div className={cn("h-screen  w-full px-4 py-4 flex relative  ")}>
          <Outlet />
        </div>
      </SidebarInset> */}
    </SidebarProvider>
  );
};
