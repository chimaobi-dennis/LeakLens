export interface CalendarAsset {
  id: string;
  name: string;
  color: string;
  platform: string;
  platformColor: string;
}

export interface CalendarSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  platform: "Instagram" | "Facebook" | "Twitter/X" | "WhatsApp";
  title: string;
  copy: string;
  assetId: string;
}

export const platformStyles: Record<string, { bg: string; text: string; dot: string }> = {
  Instagram: { bg: "rgba(212,160,23,0.19)", text: "#D4A017", dot: "#D4A017" },
  Facebook: { bg: "rgba(24,119,242,0.13)", text: "#1877F2", dot: "#1877F2" },
  "Twitter/X": { bg: "rgba(29,161,242,0.13)", text: "#1DA1F2", dot: "#1DA1F2" },
  WhatsApp: { bg: "rgba(37,211,102,0.13)", text: "#25D366", dot: "#25D366" },
};

export const calendarAssets: CalendarAsset[] = [
  { id: "a1", name: "Coffee bag on marble", color: "#C8951A", platform: "Instagram", platformColor: "#E1306C" },
  { id: "a2", name: "Testimonial card", color: "#1A2A4A", platform: "Facebook", platformColor: "#4267B2" },
  { id: "a3", name: "Feature card", color: "#1A3A38", platform: "General", platformColor: "#6B7280" },
  { id: "a4", name: "Announcement visual", color: "#1E1E1E", platform: "Instagram", platformColor: "#E1306C" },
  { id: "a5", name: "Lifestyle scene", color: "#8B6E4E", platform: "Facebook", platformColor: "#4267B2" },
  { id: "a6", name: "Pricing card", color: "#EEF0F2", platform: "General", platformColor: "#6B7280" },
];

export const defaultSlots: CalendarSlot[] = [
  {
    id: "s1",
    date: "2026-03-17",
    time: "09:00",
    platform: "Instagram",
    title: "Morning ritual",
    copy: "Start your morning ritual with single-origin perfection. ☕ The coffee Lagos deserved — link in bio.",
    assetId: "a1",
  },
  {
    id: "s2",
    date: "2026-03-19",
    time: "12:00",
    platform: "Facebook",
    title: "What our customers say",
    copy: "Don't take our word for it — hear what Lagos coffee lovers are saying about Roast & Co.",
    assetId: "a2",
  },
  {
    id: "s3",
    date: "2026-03-21",
    time: "17:00",
    platform: "Twitter/X",
    title: "New blend dropping",
    copy: "Something new is brewing. Our latest single-origin blend drops next week. Stay tuned. ☕",
    assetId: "a3",
  },
  {
    id: "s4",
    date: "2026-03-24",
    time: "09:00",
    platform: "Instagram",
    title: "The third space",
    copy: "Your favourite third space just got better. Visit us this week for a complimentary tasting.",
    assetId: "a1",
  },
];
