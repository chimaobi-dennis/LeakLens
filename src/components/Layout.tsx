import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 min-h-screen pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
}
