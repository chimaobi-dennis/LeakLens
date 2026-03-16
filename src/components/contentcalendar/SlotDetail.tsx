import { useState } from "react";
import { X, Trash2, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CalendarSlot, calendarAssets, platformStyles } from "./types";
import { toast } from "sonner";

interface SlotDetailProps {
  slot: CalendarSlot | null;
  isNew?: boolean;
  newDate?: string;
  onClose: () => void;
}

const timeOptions = ["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
const platforms: Array<CalendarSlot["platform"]> = ["Instagram", "Facebook", "Twitter/X", "WhatsApp"];

export function SlotDetail({ slot, isNew, newDate, onClose }: SlotDetailProps) {
  const [reminder, setReminder] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<CalendarSlot["platform"]>(slot?.platform ?? "Instagram");
  const [copy, setCopy] = useState(slot?.copy ?? "Write your caption...");
  const [time, setTime] = useState(slot?.time ?? "09:00");

  const asset = calendarAssets.find((a) => a.id === (slot?.assetId ?? "a1"));
  const pStyle = platformStyles[slot?.platform ?? selectedPlatform];

  const dateStr = slot?.date ?? newDate ?? "";
  const d = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: pStyle?.dot }} />
          <span className="text-[13px] font-ui font-medium text-foreground">
            {isNew ? "New post" : (slot?.platform ?? selectedPlatform)}
          </span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!isNew && (
          <p className="text-[12px] font-ui text-muted-foreground">{formattedDate} · {slot?.time}</p>
        )}

        {isNew && (
          <>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui block mb-2">Platform</label>
              <div className="flex gap-2">
                {platforms.map((p) => {
                  const ps = platformStyles[p];
                  return (
                    <button
                      key={p}
                      onClick={() => setSelectedPlatform(p)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-ui border transition-colors"
                      style={{
                        backgroundColor: selectedPlatform === p ? ps.bg : "transparent",
                        color: selectedPlatform === p ? ps.text : undefined,
                        borderColor: selectedPlatform === p ? ps.dot : "hsl(var(--border))",
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui block mb-2">Date</label>
              <p className="text-[13px] font-ui text-foreground">{formattedDate}</p>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui block mb-2">Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-9 px-3 rounded-md border border-border bg-background text-[12px] font-ui text-foreground outline-none w-full"
              >
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </>
        )}

        {/* Asset preview */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui block mb-2">Asset</label>
          <div
            className="w-full rounded-lg overflow-hidden"
            style={{ backgroundColor: asset?.color ?? "#C8951A", height: 160 }}
          />
        </div>

        {/* Copy */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui">Copy</label>
            {!isNew && (
              <button className="text-[11px] font-ui text-primary hover:underline">Edit</button>
            )}
          </div>
          {isNew ? (
            <textarea
              value={copy}
              onChange={(e) => setCopy(e.target.value)}
              className="w-full min-h-[80px] rounded-md border border-border bg-background px-3 py-2 text-[13px] font-ui text-foreground leading-relaxed outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          ) : (
            <p className="text-[13px] font-ui text-foreground leading-relaxed">{slot?.copy}</p>
          )}
        </div>

        {/* Reminder */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-ui block mb-3">Reminder</label>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-ui text-foreground">Email reminder</span>
            <Switch checked={reminder} onCheckedChange={setReminder} />
          </div>
          {reminder && (
            <div className="mt-3 space-y-2">
              <select className="w-full h-9 px-3 rounded-md border border-border bg-background text-[12px] font-ui text-foreground outline-none">
                <option>2 hours before</option>
                <option>1 hour before</option>
                <option>30 minutes before</option>
              </select>
              <p className="text-[12px] font-ui text-muted-foreground">chimaobi@roastandco.com</p>
            </div>
          )}
        </div>

        {/* Info note */}
        <div className="rounded-lg bg-muted/50 p-3 flex gap-2">
          <Info size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-[11px] font-ui text-muted-foreground leading-relaxed">
            We will send you a reminder when it is time to post. Manual posting for now — auto-scheduling coming in a future update.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={() => {
            toast.success(isNew ? "Post added to calendar" : "Changes saved");
            onClose();
          }}
          className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-[13px] font-ui font-medium hover:bg-primary/90 transition-colors"
        >
          {isNew ? "Add to calendar" : "Save changes"}
        </button>
        {!isNew && (
          <button className="w-full text-center text-[12px] font-ui text-muted-foreground hover:text-destructive inline-flex items-center justify-center gap-1 py-1">
            <Trash2 size={12} /> Remove from calendar
          </button>
        )}
      </div>
    </div>
  );
}
