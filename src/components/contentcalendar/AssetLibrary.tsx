import { useState } from "react";
import { Search, GripVertical, Upload } from "lucide-react";
import { calendarAssets } from "./types";

export function AssetLibrary() {
  const [search, setSearch] = useState("");

  const filtered = calendarAssets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-ui mb-3">
          Asset library
        </h3>
      </div>
      <div className="px-3 mb-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-lg border border-border bg-background text-[12px] font-ui text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-2">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="group mx-1 mb-2 rounded-lg border border-border overflow-hidden cursor-grab hover:border-card-border-hover transition-colors"
          >
            <div className="h-[72px] relative" style={{ backgroundColor: asset.color }}>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity">
                <GripVertical size={14} className="text-foreground" />
              </div>
            </div>
            <div className="px-2 py-1.5 bg-card">
              <p className="text-[11px] font-ui font-medium text-foreground truncate">{asset.name}</p>
              <span
                className="inline-block text-[10px] font-ui mt-0.5 px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: asset.platformColor + "20",
                  color: asset.platformColor,
                }}
              >
                {asset.platform}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3 text-center">
        <button className="text-[12px] font-ui text-primary hover:underline inline-flex items-center gap-1">
          <Upload size={12} /> Upload asset
        </button>
      </div>
    </div>
  );
}
