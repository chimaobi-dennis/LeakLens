import { useLocation } from "react-router-dom";
import { HelpCircle, MessageSquarePlus, Bell, Sun, Moon, ChevronRight, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useState, useRef, useEffect } from "react";

const routeTitles: Record<string, string> = {
  "/": "greeting",
  "/mentor": "Mentor",
  "/pro-studio": "ProStudio",
  "/campaign-kit": "CampaignKit",
  "/content-calendar": "ContentCalendar",
  "/doc-studio": "DocStudio",
  "/reel-builder": "ReelBuilder",
  "/brand-dna": "Brand DNA",
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function TopBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const titleKey = routeTitles[location.pathname] || "Home";
  const title = titleKey === "greeting" ? `${getGreeting()}, Chimaobi` : titleKey;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 bg-sidebar border-b-[0.5px] border-border flex-shrink-0">
      {/* Left — page title */}
      <h1 className="font-display text-lg text-foreground truncate">{title}</h1>

      {/* Right — actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Guide — hidden on mobile */}
        <button className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
          <HelpCircle size={18} />
        </button>

        {/* Feedback — hidden on mobile */}
        <button className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
          <MessageSquarePlus size={18} />
        </button>

        {/* Notifications */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-1 h-9 px-3 rounded-full border border-border bg-muted/30 hover:bg-muted/50 transition-all duration-200"
        >
          {theme === "dark" ? (
            <Moon size={16} className="text-primary" />
          ) : (
            <Sun size={16} className="text-primary" />
          )}
        </button>

        {/* Avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-ui font-semibold hover:ring-2 hover:ring-primary/30 transition-all duration-200"
          >
            RC
          </button>

          {dropdownOpen && (
            <div className="absolute top-12 right-0 w-[280px] rounded-2xl bg-card border border-card-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Brand identity card */}
              <div className="p-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-ui font-semibold flex-shrink-0">
                  RC
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-foreground">Roast and Co</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-ui font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">Pro Plan</span>
                  </div>
                  <p className="text-[12px] font-ui text-muted-foreground mt-0.5 truncate">hello@roastandco.com</p>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Plan details */}
              <div className="p-4 space-y-2.5">
                {[
                  ["Plan", "Pro"],
                  ["Credits remaining", "847"],
                  ["Plan renews", "Apr 15, 2026"],
                  ["Member since", "Jan 2026"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[12px] font-ui text-muted-foreground">{label}</span>
                    <span className="text-[12px] font-ui text-primary font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border" />

              {/* Account links */}
              <div className="py-1">
                {["Subscription and billing", "Invoices", "Account settings"].map((item) => (
                  <button key={item} className="w-full flex items-center justify-between px-5 py-2.5 text-[13px] font-ui text-foreground hover:bg-muted/50 transition-colors duration-200">
                    <span>{item}</span>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="border-t border-border" />

              {/* Legal / support */}
              <div className="py-1">
                {["Terms and conditions", "Privacy policy", "Help center"].map((item) => (
                  <button key={item} className="w-full flex items-center justify-between px-5 py-2 text-[12px] font-ui text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200">
                    <span>{item}</span>
                    <ChevronRight size={12} className="text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="border-t border-border" />

              {/* Sign out */}
              <button className="w-full flex items-center gap-2 px-5 py-3 text-[13px] font-ui text-destructive hover:bg-destructive/10 transition-colors duration-200">
                <LogOut size={14} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
