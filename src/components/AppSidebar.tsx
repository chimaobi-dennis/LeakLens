import { MessageCircle, Camera, Megaphone, Calendar, FileText, Film, Shield, Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Mentor", icon: MessageCircle, path: "/" },
  { label: "ProStudio", icon: Camera, path: "/pro-studio" },
  { label: "CampaignKit", icon: Megaphone, path: "/campaign-kit" },
  { label: "ContentCalendar", icon: Calendar, path: "/content-calendar" },
  { label: "DocStudio", icon: FileText, path: "/doc-studio" },
  { label: "ReelBuilder", icon: Film, path: "/reel-builder" },
  { label: "Brand DNA", icon: Shield, path: "/brand-dna" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-card border border-border text-foreground"
      >
        <Menu size={20} />
      </button>

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen flex flex-col
          bg-background border-r border-border
          transition-all duration-200 ease-in-out
          ${collapsed ? "w-16 -translate-x-full md:translate-x-0" : "w-[220px] translate-x-0"}
        `}
      >
        {/* Nav items */}
        <nav className="flex-1 pt-6 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setCollapsed(true);
                }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-ui
                  transition-all duration-200 ease-in-out group relative
                  ${isActive
                    ? "text-primary border-l-2 border-primary bg-[#D4A0171A]"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                  }
                `}
              >
                <item.icon size={18} className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom avatar */}
        {!collapsed && (
          <div className="px-4 py-4 border-t border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-card border border-border flex-shrink-0" />
            <span className="text-muted-foreground text-[13px] font-ui">Roast & Co</span>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-background/60 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
