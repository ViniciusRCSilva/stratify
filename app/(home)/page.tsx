import Dashboard from "../_components/dashboard";
import { SidebarProvider, SidebarTrigger } from "../_components/ui/sidebar";
import { MenuSidebar } from "../_components/menu_sidebar";
import { Button } from "../_components/ui/button";
import { Bell } from "lucide-react";

export default function Home() {
  return (
    <SidebarProvider className="font-[family-name:var(--font-josefin-sans)]">
      <MenuSidebar />
      <div className="w-full flex flex-col gap-4 px-10 pb-10">
        <div className="sticky top-0 pt-10 pb-4 flex items-center justify-between gap-2 bg-background/50 backdrop-blur z-50">
          <div className="flex items-center gap-1">
            <SidebarTrigger />
            <h1 className="text-2xl md:text-3xl font-thin">Dashboard</h1>
          </div>
          <Button className="flex items-center" variant="outline" size="icon">
            <Bell />
          </Button>
        </div>

        <Dashboard />
      </div>
    </SidebarProvider>
  );
}
