import { useState } from "react";
import { Monitor, LayoutGrid, Star, Tag, Quote, Megaphone, Columns, BookOpen, Check, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const outputTypes = [
  { name: "App Mockup", icon: Monitor, desc: "Device frames for your app" },
  { name: "Feature Cards", icon: LayoutGrid, desc: "Highlight your key features" },
  { name: "Benefit Visual", icon: Star, desc: "Show your product benefits" },
  { name: "Pricing Card", icon: Tag, desc: "Clean pricing presentation" },
  { name: "Testimonial Card", icon: Quote, desc: "Customer social proof" },
  { name: "Announcement", icon: Megaphone, desc: "Product or offer launches" },
  { name: "Comparison Table", icon: Columns, desc: "Side by side comparisons" },
  { name: "Brand Story", icon: BookOpen, desc: "Your brand in a visual" },
];

interface Props {
  brandId: string;
  brandName: string;
  brandColor: string;
}

const brandDefaults: Record<string, { name: string; quote: string; role: string; previewBg: string; initials: string }> = {
  "1": {
    name: "Adaeze K.",
    quote: "I built my entire launch campaign in one session. It felt like someone finally understood what I was building.",
    role: "Founder, StyleHaus Lagos",
    previewBg: "bg-primary",
    initials: "R&C",
  },
  "2": {
    name: "Tunde M.",
    quote: "Lagos Eats helped me tell my restaurant's story in a way that actually connected with customers.",
    role: "Chef, Mama's Kitchen",
    previewBg: "bg-emerald-600",
    initials: "LE",
  },
};

export function DigitalProductTab({ brandId }: Props) {
  const [selected, setSelected] = useState("Testimonial Card");
  const [generated, setGenerated] = useState(true);

  const defaults = brandDefaults[brandId] || brandDefaults["1"];
  const [customerName, setCustomerName] = useState(defaults.name);
  const [customerQuote, setCustomerQuote] = useState(defaults.quote);
  const [customerRole, setCustomerRole] = useState(defaults.role);
  const [rating, setRating] = useState(4);

  // Reset form when brand changes
  const currentDefaults = brandDefaults[brandId] || brandDefaults["1"];
  if (customerName === (brandDefaults[brandId === "1" ? "2" : "1"] || brandDefaults["1"]).name) {
    // brand switched — reset
    setCustomerName(currentDefaults.name);
    setCustomerQuote(currentDefaults.quote);
    setCustomerRole(currentDefaults.role);
  }

  return (
    <div className="space-y-6">
      {/* Section 1 — Output type selector */}
      <div>
        <h3 className="text-[11px] uppercase text-muted-foreground font-ui tracking-wider mb-3">What do you want to create?</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {outputTypes.map(({ name, icon: Icon, desc }) => {
            const isSelected = name === selected;
            return (
              <button
                key={name}
                onClick={() => { setSelected(name); setGenerated(false); }}
                className={cn(
                  "rounded-xl p-4 border text-left transition-colors bg-card dark:bg-[hsl(210_37%_16%)] cursor-pointer",
                  isSelected
                    ? "border-primary border-2 border-t-[3px]"
                    : "border-border hover:border-primary/40"
                )}
              >
                <Icon size={20} className="text-primary mb-2" />
                <div className="text-[13px] font-ui font-medium text-foreground">{name}</div>
                <div className="text-[11px] font-ui text-muted-foreground mt-0.5">{desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Brief panel */}
      {selected === "Testimonial Card" && (
        <div className="rounded-xl border border-border p-5 bg-card space-y-4">
          <div>
            <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Customer name</label>
            <Input value={customerName} onChange={e => setCustomerName(e.target.value)} className="h-10" />
          </div>
          <div>
            <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Their quote</label>
            <Textarea value={customerQuote} onChange={e => setCustomerQuote(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Their role</label>
            <Input value={customerRole} onChange={e => setCustomerRole(e.target.value)} className="h-10" />
          </div>
          <div>
            <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={20} className={cn(s <= rating ? "text-primary fill-primary" : "text-muted-foreground")} />
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full h-12 rounded-lg text-[14px] font-ui" onClick={() => setGenerated(true)}>
            Generate
          </Button>
        </div>
      )}

      {/* Section 3 — Preview */}
      {selected === "Testimonial Card" && generated && (
        <div className="space-y-4">
          <div className={cn("mx-auto w-full max-w-[360px] rounded-xl p-6 space-y-3", currentDefaults.previewBg)}>
            <span className="font-display text-[28px] leading-none text-primary-foreground/30">"</span>
            <p className="font-display text-[16px] leading-relaxed text-primary-foreground">{customerQuote}</p>
            <div className="pt-2">
              <div className="text-[13px] font-ui font-medium text-primary-foreground">{customerName}</div>
              <div className="text-[11px] font-ui text-primary-foreground/60">{customerRole}</div>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} className={cn(s <= rating ? "text-primary-foreground fill-primary-foreground" : "text-primary-foreground/30")} />
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-[10px] font-ui font-bold text-primary-foreground">{currentDefaults.initials}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button className="h-9 text-[13px]">Save to Library</Button>
            <Button variant="outline" className="h-9 text-[13px] gap-1">
              <Download size={14} /> Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
