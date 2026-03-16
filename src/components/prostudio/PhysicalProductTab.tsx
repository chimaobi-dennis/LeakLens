import { useState } from "react";
import { Camera, Sparkles, Download, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const scenes = [
  "Café Counter", "Marble Surface", "Outdoor Lifestyle", "Studio White", "Urban Street",
  "Forest Floor", "Beach Sand", "Wooden Desk", "Luxury Hotel", "Night Neon",
  "Raw Concrete", "Linen Cloth", "Sunrise Window", "Bookshelf", "Kitchen Tile",
  "Rooftop", "Garden Table", "Vintage Paper", "Glass Surface", "Mountain Mist",
];

const sceneColors = [
  "bg-amber-900/40", "bg-stone-400/30", "bg-green-800/30", "bg-gray-200 dark:bg-gray-700", "bg-slate-600/40",
  "bg-emerald-900/40", "bg-yellow-200/40", "bg-amber-800/30", "bg-purple-900/30", "bg-indigo-900/40",
  "bg-stone-500/30", "bg-orange-100 dark:bg-orange-900/20", "bg-yellow-300/20", "bg-amber-700/30", "bg-sky-200/30",
  "bg-slate-400/30", "bg-green-600/20", "bg-orange-200/30", "bg-cyan-200/20", "bg-blue-300/20",
];

const platforms = ["Instagram", "Facebook", "General"];
const platformColors: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-400",
  Facebook: "bg-blue-500/20 text-blue-400",
  General: "bg-muted text-muted-foreground",
};

interface Props {
  brandId: string;
  brandName: string;
  brandColor: string;
}

const brandProducts: Record<string, { name: string; bgClass: string }> = {
  "1": { name: "Roast & Co — Signature Blend", bgClass: "bg-primary/80" },
  "2": { name: "Lagos Eats — Jollof Spice Mix", bgClass: "bg-emerald-600/80" },
};

export function PhysicalProductTab({ brandId }: Props) {
  const [selectedScene, setSelectedScene] = useState("Marble Surface");
  const [hasUploaded] = useState(true);
  const [savedCards, setSavedCards] = useState<Record<number, boolean>>({ 0: true });

  const product = brandProducts[brandId] || brandProducts["1"];
  const variationTints = brandId === "2"
    ? ["bg-emerald-700/60", "bg-emerald-600/50", "bg-emerald-800/50"]
    : ["bg-primary/50", "bg-primary/40", "bg-primary/60"];

  return (
    <div className="space-y-6">
      {/* Section 1 — Upload / Preview */}
      {hasUploaded ? (
        <div className={cn("relative h-40 rounded-xl flex items-center justify-center", product.bgClass)}>
          <span className="font-display text-[16px] text-primary-foreground">{product.name}</span>
          <button className="absolute top-2 right-3 text-[11px] text-destructive/70 hover:text-destructive font-ui">
            Remove
          </button>
        </div>
      ) : (
        <div className="h-40 rounded-xl border-[1.5px] border-dashed border-primary/40 bg-card dark:bg-[hsl(210_37%_16%)] flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-primary/60 transition-colors">
          <Camera size={24} className="text-primary" />
          <span className="text-[14px] font-ui text-primary">Drop your product photo here</span>
          <span className="text-[12px] font-ui text-primary/60 hover:underline cursor-pointer">or click to upload</span>
        </div>
      )}

      {/* Section 2 — Scene selector */}
      <div>
        <h3 className="text-[11px] uppercase text-muted-foreground font-ui tracking-wider mt-6 mb-3">Choose a scene</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {scenes.map((scene, i) => {
            const isSelected = scene === selectedScene;
            return (
              <button
                key={scene}
                onClick={() => setSelectedScene(scene)}
                className={cn(
                  "h-[120px] rounded-lg border overflow-hidden flex flex-col bg-card dark:bg-[hsl(210_37%_16%)] transition-colors relative",
                  isSelected ? "border-primary border-2" : "border-border"
                )}
              >
                <div className={cn("flex-1", sceneColors[i])} />
                <div className="h-[30%] flex items-center justify-center px-1">
                  <span className="text-[11px] font-ui text-foreground text-center leading-tight">{scene}</span>
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3 — Generate */}
      <Button className="w-full h-12 rounded-lg text-[14px] font-ui gap-2 mt-6">
        <Sparkles size={16} />
        Generate Visuals
      </Button>

      {/* Results */}
      <div>
        <h3 className="text-[11px] uppercase text-muted-foreground font-ui tracking-wider mt-4 mb-3">Generated variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden bg-card">
              <div className={cn("h-[200px] flex items-center justify-center", variationTints[i])}>
                <span className="font-display text-[14px] text-primary-foreground/80">Variation {i + 1}</span>
              </div>
              <div className="p-3 flex items-center gap-2">
                <span className={cn("text-[10px] font-ui px-2 py-0.5 rounded-full", platformColors[platforms[i]])}>
                  {platforms[i]}
                </span>
                <div className="flex-1" />
                <Button variant="outline" size="sm" className="h-8 text-[11px] gap-1">
                  <Download size={12} /> Download
                </Button>
                {savedCards[i] ? (
                  <span className="text-[11px] font-ui text-emerald-500 flex items-center gap-1">
                    <Check size={12} /> Saved
                  </span>
                ) : (
                  <Button size="sm" className="h-8 text-[11px]" onClick={() => setSavedCards(p => ({ ...p, [i]: true }))}>
                    Save to Library
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
