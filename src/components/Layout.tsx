import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
