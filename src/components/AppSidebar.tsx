import { MessageCircle, Camera, Megaphone, Calendar, FileText, Film, Shield } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { label: "Mentor", icon: MessageCircle, path: "/" },
  { label: "ProStudio", icon: Camera, path: "/pro-studio" },
  { label: "CampaignKit", icon: Megaphone, path: "/campaign-kit" },
  { label: "ContentCalendar", icon: Calendar, path: "/content-calendar" },
  { label: "DocStudio", icon: FileText, path: "/doc-studio" },
  { label: "ReelBuilder", icon: Film, path: "/reel-builder" },
];

const secondaryItems = [
  { label: "Brand DNA", icon: Shield, path: "/brand-dna" },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Desktop sidebar (>1024px): full 220px ── */}
      <aside className="hidden lg:flex sticky top-0 left-0 z-40 h-screen w-[220px] flex-col bg-background border-r border-transparent relative flex-shrink-0">
        {/* Subtle amber glow right border */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

        <nav className="flex-1 pt-6 px-2 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-ui
                  transition-all duration-200 ease-in-out group relative
                  ${active
                    ? "text-primary border-l-2 border-primary bg-[hsl(var(--active-tint))]"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                  }
                `}
              >
                <item.icon size={18} className={active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Divider before Brand DNA */}
          <div className="mx-3 my-2 border-t border-border" />

          {secondaryItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-ui
                  transition-all duration-200 ease-in-out group relative
                  ${active
                    ? "text-primary border-l-2 border-primary bg-[hsl(var(--active-tint))]"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                  }
                `}
              >
                <item.icon size={18} className={active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-card border border-card-border flex-shrink-0" />
          <span className="text-muted-foreground text-[13px] font-ui">Roast & Co</span>
        </div>
      </aside>

      {/* ── Tablet sidebar (768–1024px): icon-only 64px ── */}
      <aside className="hidden md:flex lg:hidden sticky top-0 left-0 z-40 h-screen w-16 flex-col items-center bg-background border-r border-transparent relative flex-shrink-0">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

        <nav className="flex-1 pt-6 space-y-1 w-full px-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center justify-center w-full py-2.5 rounded-md
                      transition-all duration-200 ease-in-out
                      ${active
                        ? "text-primary border-l-2 border-primary bg-[hsl(var(--active-tint))]"
                        : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                      }
                    `}
                  >
                    <item.icon size={20} />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p className="font-ui text-sm">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="mx-3 my-2 border-t border-border" />

          {secondaryItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center justify-center w-full py-2.5 rounded-md
                      transition-all duration-200 ease-in-out
                      ${active
                        ? "text-primary border-l-2 border-primary bg-[hsl(var(--active-tint))]"
                        : "text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                      }
                    `}
                  >
                    <item.icon size={20} />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  <p className="font-ui text-sm">{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <div className="py-4 flex justify-center">
          <div className="w-8 h-8 rounded-full bg-card border border-card-border" />
        </div>
      </aside>

      {/* ── Mobile bottom nav (<768px) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border flex items-center justify-around px-2 py-2">
        {[...navItems, ...secondaryItems].map((item) => {
          const active = isActive(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center p-1.5 rounded-md
                transition-all duration-200
                ${active ? "text-primary" : "text-muted-foreground"}
              `}
            >
              <item.icon size={20} />
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
