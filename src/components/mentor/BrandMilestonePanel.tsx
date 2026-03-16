import { Flag, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MentorBrand, Milestone, categoryColors } from "./types";

interface BrandMilestonePanelProps {
  brands: MentorBrand[];
  activeBrand: MentorBrand;
  onSelectBrand: (brand: MentorBrand) => void;
  onAddBrand: () => void;
  milestones: Milestone[];
  onSelectMilestone: (id: string) => void;
}

export function BrandMilestonePanel({
  brands,
  activeBrand,
  onSelectBrand,
  onAddBrand,
  milestones,
  onSelectMilestone,
}: BrandMilestonePanelProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Brand switcher */}
      <div className="p-4 space-y-3 flex-shrink-0">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full h-11 rounded-lg border border-border bg-card px-3 flex items-center gap-2.5 hover:border-card-border-hover transition-colors"
          >
            <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", activeBrand.colorClass)} />
            <div className="flex-1 text-left min-w-0">
              <p className="text-[13px] font-ui font-medium text-foreground truncate">{activeBrand.name}</p>
              <p className="text-[10px] font-ui text-muted-foreground">Started {activeBrand.startedDate}</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-card border border-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => { onSelectBrand(brand); setDropdownOpen(false); }}
                  className={cn(
                    "w-full px-3 py-2.5 flex items-center gap-2.5 text-left hover:bg-muted/50 transition-colors",
                    brand.id === activeBrand.id && "bg-muted/30"
                  )}
                >
                  <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", brand.colorClass)} />
                  <div className="min-w-0">
                    <p className={cn("text-[13px] font-ui truncate", brand.id === activeBrand.id ? "text-primary font-medium" : "text-foreground")}>{brand.name}</p>
                    <p className="text-[10px] font-ui text-muted-foreground">Started {brand.startedDate}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onAddBrand}
          className="w-full h-9 rounded-lg border border-primary text-primary font-ui text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
        >
          <Plus size={15} />
          New brand
        </button>
      </div>

      <div className="px-4 flex-shrink-0">
        <div className="border-t border-border" />
        <div className="flex items-center gap-1.5 mt-3 mb-2">
          <Flag size={11} className="text-muted-foreground" />
          <p className="text-[11px] font-ui uppercase tracking-[0.1em] text-muted-foreground">
            Milestones
          </p>
        </div>
      </div>

      {/* Milestones */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-2 pb-4 space-y-0.5">
          {milestones.length === 0 ? (
            <p className="px-3 py-4 text-[12px] font-ui text-muted-foreground italic">
              Milestones will appear as your brand takes shape
            </p>
          ) : (
            milestones.map((ms) => {
              const colors = categoryColors[ms.category] || "text-muted-foreground border-border";
              const borderColor = colors.split(" ").find(c => c.startsWith("border-")) || "border-primary";
              return (
                <button
                  key={ms.id}
                  onClick={() => onSelectMilestone(ms.id)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-200 hover:bg-muted/50 border-l-2",
                    borderColor
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Flag size={11} className="text-primary flex-shrink-0" />
                    <span className="text-[13px] font-ui text-foreground leading-tight truncate">{ms.name}</span>
                  </div>
                  <p className="text-[11px] font-ui text-muted-foreground ml-[17px]">{ms.category} · {ms.timeAgo}</p>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
