import { useState } from "react";
import { X, Upload, ChevronLeft, ChevronRight, Star, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TemplateModalProps } from "./types";

const aspectOptions = ["Auto", "Square", "3:2", "9:16", "16:9"];

export function TemplateModal({ template, open, onClose, type, brandName, brandInitials }: TemplateModalProps) {
  const [selectedAspect, setSelectedAspect] = useState("Auto");
  const [hasUploaded, setHasUploaded] = useState(type === "physical");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeVariation, setActiveVariation] = useState(0);

  // Digital inputs
  const [customerName, setCustomerName] = useState("Adaeze K.");
  const [customerQuote, setCustomerQuote] = useState("I built my entire launch campaign in one session.");
  const [customerRole, setCustomerRole] = useState("Founder, StyleHaus Lagos");
  const [rating, setRating] = useState(4);
  const [planName, setPlanName] = useState("Pro Plan");
  const [price, setPrice] = useState("$29/mo");
  const [features, setFeatures] = useState("Unlimited exports\nBrand kit\nPriority support");
  const [ctaText, setCtaText] = useState("Get started");

  if (!template) return null;

  const handleRun = () => {
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      setActiveVariation(0);
    }, 1500);
  };

  const variationTints = [
    template.color,
    `${template.color}dd`,
    `${template.color}bb`,
    `${template.color}99`,
  ];

  const isTestimonial = template.name.toLowerCase().includes("testimonial") || template.name.toLowerCase().includes("social proof");
  const isPricing = template.name.toLowerCase().includes("pricing");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[880px] w-[90vw] p-0 overflow-hidden rounded-2xl border-border gap-0">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X size={16} className="text-foreground" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[85vh]">
          {/* Left panel — inputs */}
          <div className="w-full md:w-[45%] p-7 overflow-y-auto bg-card border-r border-border">
            <h2 className="font-display text-[20px] text-foreground">{template.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[9px] font-ui font-bold text-primary-foreground">P</span>
              </div>
              <span className="text-[13px] font-ui text-muted-foreground">{template.creator}</span>
              <span className="text-[11px] font-ui px-2.5 py-0.5 rounded-[10px] bg-primary/10 text-primary">
                {template.uses} uses
              </span>
            </div>

            <div className="h-px bg-border my-4" />

            {type === "physical" ? (
              <>
                {/* Upload zone */}
                {hasUploaded ? (
                  <div className="relative rounded-lg border border-border p-4 flex flex-col items-center gap-2">
                    <div className="w-[120px] h-[80px] rounded-md bg-primary flex items-center justify-center">
                      <span className="text-[11px] font-ui text-primary-foreground font-medium">{brandName}</span>
                    </div>
                    <span className="text-[11px] font-ui text-muted-foreground">product-photo.png</span>
                    <button
                      onClick={() => setHasUploaded(false)}
                      className="text-[11px] font-ui text-destructive/70 hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setHasUploaded(true)}
                    className="h-[160px] rounded-lg border-[1.5px] border-dashed border-primary/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-primary/60 transition-colors"
                  >
                    <Upload size={20} className="text-primary" />
                    <span className="text-[13px] font-ui text-primary">Upload your product photo</span>
                    <span className="text-[11px] font-ui text-muted-foreground">JPG, PNG, WebP up to 10MB</span>
                  </div>
                )}

                {/* Aspect ratio */}
                <div className="mt-4">
                  <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-2 block">
                    Aspect ratio
                  </label>
                  <div className="flex gap-1.5">
                    {aspectOptions.map((a) => (
                      <button
                        key={a}
                        onClick={() => setSelectedAspect(a)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-[12px] font-ui transition-colors",
                          selectedAspect === a
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Digital inputs */
              <div className="space-y-3">
                {isTestimonial ? (
                  <>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Customer name</label>
                      <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="h-10" />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Quote</label>
                      <Textarea value={customerQuote} onChange={(e) => setCustomerQuote(e.target.value)} rows={3} />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Role</label>
                      <Input value={customerRole} onChange={(e) => setCustomerRole(e.target.value)} className="h-10" />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s} onClick={() => setRating(s)}>
                            <Star size={20} className={cn(s <= rating ? "text-primary fill-primary" : "text-muted-foreground")} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : isPricing ? (
                  <>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Plan name</label>
                      <Input value={planName} onChange={(e) => setPlanName(e.target.value)} className="h-10" />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Price</label>
                      <Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-10" />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Features</label>
                      <Textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">CTA text</label>
                      <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="h-10" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Headline</label>
                      <Input defaultValue={`${brandName} — New Release`} className="h-10" />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">Description</label>
                      <Textarea defaultValue="Describe what makes this special..." rows={3} />
                    </div>
                    <div>
                      <label className="text-[11px] font-ui text-muted-foreground uppercase tracking-wider mb-1 block">CTA</label>
                      <Input defaultValue="Learn more" className="h-10" />
                    </div>
                  </>
                )}
              </div>
            )}

            <Button onClick={handleRun} className="w-full h-12 rounded-lg text-[14px] font-ui mt-5">
              Run template
            </Button>
            <p className="text-[11px] font-ui text-muted-foreground text-center mt-2">Uses 1 credit</p>
          </div>

          {/* Right panel — preview */}
          <div className="w-full md:w-[55%] bg-background flex flex-col items-center justify-center p-6 min-h-[400px]">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <span className="text-[13px] font-ui text-muted-foreground">Generating...</span>
              </div>
            ) : generated ? (
              <div className="flex flex-col items-center gap-4 w-full max-w-[380px]">
                {/* Main preview */}
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center relative"
                  style={{ backgroundColor: variationTints[activeVariation] }}
                >
                  {type === "physical" ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-14 rounded bg-primary-foreground/20 flex items-center justify-center">
                        <span className="text-[10px] font-ui text-white/70">{brandName}</span>
                      </div>
                      <span className="text-[12px] font-ui text-white/50">{template.name}</span>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      {isTestimonial ? (
                        <div className="space-y-2">
                          <span className="font-display text-[24px] text-white/20">"</span>
                          <p className="font-display text-[14px] text-white/80 leading-relaxed">{customerQuote}</p>
                          <p className="text-[12px] font-ui text-white/60 mt-2">{customerName}</p>
                          <p className="text-[10px] font-ui text-white/40">{customerRole}</p>
                        </div>
                      ) : isPricing ? (
                        <div className="space-y-2">
                          <p className="text-[16px] font-ui font-medium text-white/80">{planName}</p>
                          <p className="font-display text-[28px] text-white/90">{price}</p>
                          <p className="text-[11px] font-ui text-white/50 whitespace-pre-line">{features}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-[10px] font-ui font-bold text-white/60">{brandInitials}</span>
                          </div>
                          <span className="text-[13px] font-ui text-white/60">{template.name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Variation counter */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveVariation((p) => Math.max(0, p - 1))}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronLeft size={14} className="text-foreground" />
                  </button>
                  <span className="text-[13px] font-ui text-muted-foreground">
                    {activeVariation + 1} / 4
                  </span>
                  <button
                    onClick={() => setActiveVariation((p) => Math.min(3, p + 1))}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ChevronRight size={14} className="text-foreground" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveVariation(i)}
                      className={cn(
                        "w-16 h-16 rounded-md overflow-hidden border-2 transition-colors",
                        activeVariation === i ? "border-primary" : "border-transparent"
                      )}
                      style={{ backgroundColor: variationTints[i] }}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full">
                  <Button variant="outline" className="flex-1 h-10 text-[13px] gap-1.5">
                    <Download size={14} /> Download
                  </Button>
                  <Button className="flex-1 h-10 text-[13px]">Save to Library</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-full max-w-[300px] aspect-[4/3] rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: template.color }}
                >
                  <span className="text-[13px] font-ui text-white/30">{template.name}</span>
                </div>
                <span className="text-[11px] font-ui text-muted-foreground text-center">
                  Example output — upload your product to generate
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
