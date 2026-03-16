import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { BrandContextBar } from "./BrandContextBar";

const modulePaths = ["/mentor", "/pro-studio", "/campaign-kit", "/content-calendar", "/doc-studio", "/reel-builder"];

export function Layout() {
  const location = useLocation();
  const showBrandBar = modulePaths.includes(location.pathname);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top bar — fixed, never scrolls */}
      <TopBar />

      {/* Body row — fills remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar — fixed height, never scrolls (hidden on mobile) */}
        <AppSidebar />

        {/* Main content — the ONLY scrollable region */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden pb-16 md:pb-0">
          {showBrandBar && (
            <div className="relative">
              <BrandContextBar />
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
