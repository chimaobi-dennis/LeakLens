import { Check } from "lucide-react";
import { AssetCard } from "./types";
import { cn } from "@/lib/utils";

interface Props {
  assets: AssetCard[];
  selectedId: string;
  onSelect: (id: string) => void;
  onSkip: () => void;
}

export function AssetPicker({ assets, selectedId, onSelect, onSkip }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-ui">
          Select an asset from your library
        </h3>
        <button onClick={onSkip} className="text-[12px] text-primary/70 hover:text-primary font-ui transition-colors">
          Skip — use copy only
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {assets.map((asset) => (
          <button
            key={asset.id}
            onClick={() => onSelect(asset.id)}
            className={cn(
              "w-[120px] h-[120px] rounded-lg overflow-hidden border flex-shrink-0 relative cursor-pointer transition-all duration-200",
              selectedId === asset.id
                ? "border-2 border-primary"
                : "border-border hover:border-muted-foreground/30"
            )}
          >
            <div className="w-full h-[80%]" style={{ backgroundColor: asset.color }} />
            <div className="h-[20%] flex items-center justify-center bg-card">
              <span
                className="text-[10px] font-ui px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: asset.platformColor }}
              >
                {asset.platform}
              </span>
            </div>
            {selectedId === asset.id && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                <Check size={10} className="text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
