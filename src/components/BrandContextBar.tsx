import { useBrand } from "@/hooks/use-brand";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function BrandContextBar() {
  const { brands, activeBrand, setActiveBrand, hasBrands } = useBrand();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!hasBrands) {
    return (
      <div className="h-10 flex items-center px-4 md:px-6 bg-muted/30 border-b border-border text-[12px] font-ui text-muted-foreground flex-shrink-0">
        No brand selected —{" "}
        <Link to="/mentor" className="text-primary hover:underline ml-1">
          start by chatting with your Mentor
        </Link>
      </div>
    );
  }

  return (
    <div className="h-10 flex items-center px-4 md:px-6 bg-muted/30 border-b border-border flex-shrink-0" ref={ref}>
      <span className="text-[11px] font-ui text-muted-foreground mr-2">Working on:</span>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card hover:border-card-border-hover transition-colors duration-200"
      >
        <div className={`w-2.5 h-2.5 rounded-full ${activeBrand?.color} flex-shrink-0`} />
        <span className="text-[12px] font-ui text-foreground">{activeBrand?.name}</span>
        <ChevronDown size={12} className="text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-4 md:left-6 w-[220px] rounded-xl bg-card border border-card-border shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => { setActiveBrand(brand); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-ui text-foreground hover:bg-muted/50 transition-colors duration-200"
              >
                <div className={`w-3 h-3 rounded-full ${brand.color} flex-shrink-0`} />
                <span className="flex-1 text-left">{brand.name}</span>
                {activeBrand?.id === brand.id && <Check size={14} className="text-primary" />}
              </button>
            ))}
          </div>
          <div className="border-t border-border">
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] font-ui text-primary hover:bg-muted/50 transition-colors duration-200">
              + Add new brand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
