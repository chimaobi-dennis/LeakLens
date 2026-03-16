import { useState, useCallback } from "react";
import { Menu, PanelRightOpen, PanelRightClose } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BrandMilestonePanel } from "@/components/mentor/BrandMilestonePanel";
import { ChatPanel } from "@/components/mentor/ChatPanel";
import { BrandDNAPanel } from "@/components/mentor/BrandDNAPanel";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { brands as allBrands, roastData, lagosData } from "@/components/mentor/data";
import { MentorBrand, BrandData, BrandDNAField, Milestone, Message } from "@/components/mentor/types";

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

const emptyDNAFields: BrandDNAField[] = [
  "Brand name", "Industry", "Voice", "Target audience", "Positioning",
  "Brand references", "Core promise", "Campaign strategy", "Customer insight", "Product positioning",
].map(key => ({ key, label: key, value: null }));

const newBrandGreeting: Message = {
  id: "new-1",
  role: "ai",
  content: "Let us start from the beginning. What are we building? Tell me the idea — not the polished version, the real one.",
};

let brandCounter = 0;

const Mentor = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const [brands, setBrands] = useState<MentorBrand[]>(allBrands);
  const [activeBrandId, setActiveBrandId] = useState("roast");

  // Per-brand data store
  const [brandDataMap, setBrandDataMap] = useState<Record<string, BrandData>>({
    roast: roastData,
    lagos: lagosData,
  });

  const activeBrandData = brandDataMap[activeBrandId];
  const activeBrand = brands.find(b => b.id === activeBrandId) || brands[0];

  const [scrollToMilestoneId, setScrollToMilestoneId] = useState<string | null>(null);
  const [highlightDNAField, setHighlightDNAField] = useState<string | null>(null);

  const handleSelectBrand = (brand: MentorBrand) => {
    setActiveBrandId(brand.id);
  };

  const handleAddBrand = () => {
    brandCounter++;
    const newId = `new-${brandCounter}`;
    const newBrand: MentorBrand = {
      id: newId,
      name: "Untitled Brand",
      colorClass: "bg-muted-foreground",
      startedDate: "Mar 2026",
    };
    const newData: BrandData = {
      brand: newBrand,
      milestones: [],
      messages: [newBrandGreeting],
      savePrompts: [],
      milestoneMarkers: [],
      dnaFields: emptyDNAFields.map(f => ({ ...f })),
    };
    setBrands(prev => [...prev, newBrand]);
    setBrandDataMap(prev => ({ ...prev, [newId]: newData }));
    setActiveBrandId(newId);
  };

  const handleSelectMilestone = (milestoneId: string) => {
    setScrollToMilestoneId(milestoneId);
    if (isMobile) setLeftOpen(false);
  };

  const handleMilestoneScrolled = useCallback(() => {
    setScrollToMilestoneId(null);
  }, []);

  const handleSaveDNA = useCallback((field: string, value: string) => {
    setBrandDataMap(prev => {
      const data = prev[activeBrandId];
      if (!data) return prev;
      return {
        ...prev,
        [activeBrandId]: {
          ...data,
          dnaFields: data.dnaFields.map(f =>
            f.key === field ? { ...f, value, savedFrom: "Brand Discovery", savedTimeAgo: "Just now" } : f
          ),
        },
      };
    });
    setHighlightDNAField(field);
    setTimeout(() => setHighlightDNAField(null), 1500);
  }, [activeBrandId]);

  const showLeftInline = !isMobile;
  const showRightInline = !isMobile && !isTablet;

  return (
    <div className="flex-1 min-h-0 flex overflow-hidden">
      {/* Left panel */}
      {showLeftInline ? (
        <aside className="w-60 flex-shrink-0 border-r border-border bg-card/50 overflow-hidden">
          <BrandMilestonePanel
            brands={brands}
            activeBrand={activeBrand}
            onSelectBrand={handleSelectBrand}
            onAddBrand={handleAddBrand}
            milestones={activeBrandData?.milestones || []}
            onSelectMilestone={handleSelectMilestone}
          />
        </aside>
      ) : (
        <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Brand & Milestones</SheetTitle>
            <BrandMilestonePanel
              brands={brands}
              activeBrand={activeBrand}
              onSelectBrand={(b) => { handleSelectBrand(b); setLeftOpen(false); }}
              onAddBrand={() => { handleAddBrand(); setLeftOpen(false); }}
              milestones={activeBrandData?.milestones || []}
              onSelectMilestone={handleSelectMilestone}
            />
          </SheetContent>
        </Sheet>
      )}

      {/* Centre panel */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden relative">
        {isMobile && (
          <div className="h-10 flex items-center px-3 gap-2 border-b border-border flex-shrink-0">
            <button onClick={() => setLeftOpen(true)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Menu size={18} />
            </button>
            <span className="text-[13px] font-ui text-foreground flex-1">Mentor</span>
          </div>
        )}

        {isTablet && !isMobile && (
          <button
            onClick={() => setRightOpen(!rightOpen)}
            className="absolute top-2 right-2 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            {rightOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        )}

        {activeBrandData && (
          <ChatPanel
            brand={activeBrand}
            messages={activeBrandData.messages}
            milestones={activeBrandData.milestones}
            milestoneMarkers={activeBrandData.milestoneMarkers}
            savePrompts={activeBrandData.savePrompts}
            onSaveDNA={handleSaveDNA}
            scrollToMilestoneId={scrollToMilestoneId}
            onMilestoneScrolled={handleMilestoneScrolled}
          />
        )}
      </div>

      {/* Right panel */}
      {showRightInline ? (
        <aside className="w-[280px] flex-shrink-0 border-l border-border bg-card/50 overflow-hidden">
          <BrandDNAPanel
            fields={activeBrandData?.dnaFields || emptyDNAFields}
            highlightField={highlightDNAField}
          />
        </aside>
      ) : (
        !isMobile && (
          <Sheet open={rightOpen} onOpenChange={setRightOpen}>
            <SheetContent side="right" className="w-80 p-0">
              <SheetTitle className="sr-only">Brand DNA</SheetTitle>
              <BrandDNAPanel
                fields={activeBrandData?.dnaFields || emptyDNAFields}
                highlightField={highlightDNAField}
              />
            </SheetContent>
          </Sheet>
        )
      )}
    </div>
  );
};

export default Mentor;
