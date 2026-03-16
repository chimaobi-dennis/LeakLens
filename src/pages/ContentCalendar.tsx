import { useState } from "react";
import { PanelLeft, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AssetLibrary } from "@/components/contentcalendar/AssetLibrary";
import { CalendarGrid } from "@/components/contentcalendar/CalendarGrid";
import { SlotDetail } from "@/components/contentcalendar/SlotDetail";
import { CalendarSlot, defaultSlots } from "@/components/contentcalendar/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ContentCalendar() {
  const isMobile = useIsMobile();
  const isTablet = !isMobile && typeof window !== "undefined" && window.innerWidth < 1024;

  const [slots] = useState<CalendarSlot[]>(defaultSlots);
  const [showLibrary, setShowLibrary] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null);
  const [newSlotDate, setNewSlotDate] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleSlotClick = (slot: CalendarSlot) => {
    setSelectedSlot(slot);
    setNewSlotDate(null);
    setShowDetail(true);
  };

  const handleEmptyClick = (date: string) => {
    setSelectedSlot(null);
    setNewSlotDate(date);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedSlot(null);
    setNewSlotDate(null);
  };

  const showLeftPanel = !isMobile && !isTablet;
  const showRightPanel = showDetail;

  const [exporting, setExporting] = useState(false);
  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      toast.success("Week exported successfully");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Mobile/tablet library toggle */}
        {(isMobile || isTablet) && (
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="fixed bottom-16 left-4 z-20 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg md:bottom-14"
          >
            <PanelLeft size={18} />
          </button>
        )}

        {/* Left panel - Asset Library */}
        {showLeftPanel && (
          <div className="w-[200px] flex-shrink-0 border-r border-border bg-card overflow-hidden flex flex-col">
            <AssetLibrary />
          </div>
        )}

        {/* Mobile/tablet library drawer */}
        {(isMobile || isTablet) && showLibrary && (
          <>
            <div className="fixed inset-0 z-30 bg-background/80" onClick={() => setShowLibrary(false)} />
            <div className="fixed left-0 top-0 bottom-0 z-40 w-[240px] bg-card border-r border-border shadow-xl">
              <AssetLibrary />
            </div>
          </>
        )}

        {/* Centre - Calendar */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <CalendarGrid
            slots={slots}
            onSlotClick={handleSlotClick}
            onEmptyClick={handleEmptyClick}
          />
        </div>

        {/* Right panel - Slot detail */}
        {showRightPanel && (
          <>
            {isMobile && (
              <div className="fixed inset-0 z-30 bg-background/80" onClick={handleCloseDetail} />
            )}
            <div
              className={cn(
                "flex-shrink-0 border-l border-border bg-card flex flex-col overflow-hidden",
                isMobile
                  ? "fixed right-0 top-0 bottom-0 z-40 w-[280px] shadow-xl"
                  : "w-[280px]"
              )}
            >
              <SlotDetail
                slot={selectedSlot}
                isNew={!selectedSlot}
                newDate={newSlotDate ?? undefined}
                onClose={handleCloseDetail}
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom export bar */}
      <div className="h-12 flex-shrink-0 border-t border-border px-5 flex items-center justify-between bg-card">
        <span className="text-[12px] font-ui text-muted-foreground">
          {slots.length} posts scheduled this month
        </span>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="h-9 px-4 rounded-lg border border-border text-[12px] font-ui text-foreground hover:bg-muted/50 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Download size={14} />
          {exporting ? "Exporting..." : "Export this week"}
        </button>
      </div>
    </div>
  );
}
