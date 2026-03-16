import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { BrandContextBar } from "./BrandContextBar";

const modulePaths = ["/mentor", "/pro-studio", "/campaign-kit", "/content-calendar", "/doc-studio", "/reel-builder"];

export function Layout() {
  const location = useLocation();
  const showBrandBar = modulePaths.includes(location.pathname);

  return (
    <div className="flex min-h-screen w-full bg-background overflow-x-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0 w-full md:w-[calc(100%-64px)] lg:w-[calc(100%-220px)] overflow-x-clip">
        <TopBar />
        {showBrandBar && (
          <div className="relative">
            <BrandContextBar />
          </div>
        )}
        <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
