import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Template } from "./types";

interface Props {
  templates: Template[];
  categories: string[];
  onSelect: (t: Template) => void;
}

const aspectClasses: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

export function TemplateGrid({ templates, categories, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Popular");

  const filtered = templates
    .filter((t) => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || t.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === "Newest") return 0;
      if (sort === "Featured") return 0;
      // Popular — parse uses
      const parseUses = (u: string) => parseFloat(u.replace("k", "")) * (u.includes("k") ? 1000 : 1);
      return parseUses(b.uses) - parseUses(a.uses);
    });

  return (
    <div>
      {/* Search & filter bar */}
      <div className="flex items-center gap-3 mb-6 p-2 rounded-xl border border-border bg-card">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full h-[44px] bg-transparent text-[13px] font-ui text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[140px] h-[36px] text-[12px] font-ui border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="text-[12px]">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[120px] h-[36px] text-[12px] font-ui border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Popular", "Newest", "Featured"].map((s) => (
              <SelectItem key={s} value={s} className="text-[12px]">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t)}
            className="break-inside-avoid rounded-xl border border-border overflow-hidden cursor-pointer group bg-card transition-shadow hover:shadow-md"
          >
            <div className="relative overflow-hidden">
              <div
                className={cn("w-full flex items-center justify-center", aspectClasses[t.aspect])}
                style={{ backgroundColor: t.color }}
              >
                <span className="text-[13px] font-ui font-medium text-white/40 select-none">
                  {t.name}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-5 py-2 rounded-[20px] bg-white/15 backdrop-blur-sm text-[13px] font-ui text-white border border-white/20">
                  Use template
                </span>
              </div>
            </div>
            <div className="p-[10px_12px] flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[13px] font-ui font-medium text-foreground truncate">
                  {t.name}
                </div>
                <div className="text-[11px] font-ui text-muted-foreground">
                  by {t.creator}
                </div>
              </div>
              <span className="text-[11px] font-ui text-muted-foreground whitespace-nowrap mt-0.5">
                {t.uses} uses
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
