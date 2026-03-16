import { useState } from "react";
import { Menu, PanelRightOpen, PanelRightClose } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SessionPanel } from "@/components/mentor/SessionPanel";
import { ChatPanel } from "@/components/mentor/ChatPanel";
import { BrandDNAPanel } from "@/components/mentor/BrandDNAPanel";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const TABLET_MAX = 1024;

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" ? window.innerWidth < TABLET_MAX : false
  );
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => setIsTablet(window.innerWidth < TABLET_MAX));
  }
  return isTablet;
}

const Mentor = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeSessionId, setActiveSessionId] = useState("1");
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const showLeftInline = !isMobile;
  const showRightInline = !isMobile && !isTablet;

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left panel — inline on desktop/tablet, drawer on mobile */}
      {showLeftInline ? (
        <aside className="w-60 flex-shrink-0 border-r border-border bg-card/50 overflow-hidden">
          <SessionPanel activeSessionId={activeSessionId} onSelectSession={setActiveSessionId} />
        </aside>
      ) : (
        <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Sessions</SheetTitle>
            <SessionPanel activeSessionId={activeSessionId} onSelectSession={(id) => { setActiveSessionId(id); setLeftOpen(false); }} />
          </SheetContent>
        </Sheet>
      )}

      {/* Centre panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden relative">
        {/* Mobile controls */}
        {isMobile && (
          <div className="h-10 flex items-center px-3 gap-2 border-b border-border flex-shrink-0">
            <button onClick={() => setLeftOpen(true)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Menu size={18} />
            </button>
            <span className="text-[13px] font-ui text-foreground flex-1">Mentor</span>
          </div>
        )}

        {/* Tablet right panel toggle */}
        {isTablet && !isMobile && (
          <button
            onClick={() => setRightOpen(!rightOpen)}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            {rightOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        )}

        <ChatPanel />
      </div>

      {/* Right panel — inline on large screens, overlay on tablet, hidden on mobile */}
      {showRightInline ? (
        <aside className="w-[280px] flex-shrink-0 border-l border-border bg-card/50 overflow-hidden">
          <BrandDNAPanel />
        </aside>
      ) : (
        !isMobile && (
          <Sheet open={rightOpen} onOpenChange={setRightOpen}>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">Brand DNA</SheetTitle>
              <BrandDNAPanel />
            </SheetContent>
          </Sheet>
        )
      )}
    </div>
  );
};

export default Mentor;
