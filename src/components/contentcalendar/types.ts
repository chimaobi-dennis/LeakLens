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
  Instagram: { bg: "rgba(45,74,62,0.19)", text: "#2D4A3E", dot: "#2D4A3E" },
  Facebook: { bg: "rgba(24,119,242,0.13)", text: "#1877F2", dot: "#1877F2" },
  "Twitter/X": { bg: "rgba(29,161,242,0.13)", text: "#1DA1F2", dot: "#1DA1F2" },
  WhatsApp: { bg: "rgba(37,211,102,0.13)", text: "#25D366", dot: "#25D366" },
};

export const calendarAssets: CalendarAsset[] = [
  { id: "a1", name: "Daily Stack on counter", color: "#2D4A3E", platform: "Instagram", platformColor: "#E1306C" },
  { id: "a2", name: "Testimonial card", color: "#1A2A3A", platform: "Facebook", platformColor: "#4267B2" },
  { id: "a3", name: "Feature card", color: "#1A3A38", platform: "General", platformColor: "#6B7280" },
  { id: "a4", name: "Announcement visual", color: "#1E2E1E", platform: "Instagram", platformColor: "#E1306C" },
  { id: "a5", name: "Lifestyle scene", color: "#3A4A3E", platform: "Facebook", platformColor: "#4267B2" },
  { id: "a6", name: "Pricing card", color: "#F5F0E8", platform: "General", platformColor: "#6B7280" },
];

export const defaultSlots: CalendarSlot[] = [
  {
    id: "s1",
    date: "2026-03-17",
    time: "09:00",
    platform: "Instagram",
    title: "Morning ritual",
    copy: "Morning ritual with Nordform Daily Stack ✦",
    assetId: "a1",
  },
  {
    id: "s2",
    date: "2026-03-19",
    time: "12:00",
    platform: "Facebook",
    title: "Customer story",
    copy: "What our customers actually say about Lion's Mane",
    assetId: "a2",
  },
  {
    id: "s3",
    date: "2026-03-21",
    time: "17:00",
    platform: "Twitter/X",
    title: "Ashwagandha science",
    copy: "The science behind Ashwagandha — honestly explained",
    assetId: "a3",
  },
  {
    id: "s4",
    date: "2026-03-24",
    time: "09:00",
    platform: "Instagram",
    title: "Built for Stockholm",
    copy: "Built for Stockholm professionals",
    assetId: "a1",
  },
];
