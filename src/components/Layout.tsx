import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-background overflow-x-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0 w-full md:w-[calc(100%-64px)] lg:w-[calc(100%-220px)] overflow-x-hidden">
        <TopBar />
        <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}