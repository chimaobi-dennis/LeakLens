import { useState } from "react";
import { Template } from "./types";
import { TemplateGrid } from "./TemplateGrid";
import { TemplateModal } from "./TemplateModal";

const categories = ["All", "Photoshoot", "Lifestyle", "Flat Lay", "Packshot", "Outdoor", "Moody Studio", "Minimal"];

const templates: Template[] = [
  { id: "p1", name: "Marble Luxury", color: "#E8E0D4", aspect: "portrait", uses: "3.2k", creator: "ProStudio Team", category: "Photoshoot" },
  { id: "p2", name: "Dark Moody Studio", color: "#2A2420", aspect: "square", uses: "2.8k", creator: "ProStudio Team", category: "Moody Studio" },
  { id: "p3", name: "Outdoor Lifestyle", color: "#8A9E80", aspect: "landscape", uses: "2.1k", creator: "ProStudio Team", category: "Outdoor" },
  { id: "p4", name: "Linen Flat Lay", color: "#E8DDD0", aspect: "square", uses: "1.9k", creator: "ProStudio Team", category: "Flat Lay" },
  { id: "p5", name: "Urban Street", color: "#8090A0", aspect: "portrait", uses: "1.7k", creator: "ProStudio Team", category: "Lifestyle" },
  { id: "p6", name: "Café Counter", color: "#A08060", aspect: "landscape", uses: "1.5k", creator: "ProStudio Team", category: "Lifestyle" },
  { id: "p7", name: "Sunrise Window", color: "#C8A870", aspect: "portrait", uses: "1.4k", creator: "ProStudio Team", category: "Photoshoot" },
  { id: "p8", name: "Minimal White", color: "#F0EDE8", aspect: "square", uses: "1.3k", creator: "ProStudio Team", category: "Minimal" },
  { id: "p9", name: "Forest Floor", color: "#405840", aspect: "portrait", uses: "1.2k", creator: "ProStudio Team", category: "Outdoor" },
  { id: "p10", name: "Night Neon", color: "#201830", aspect: "square", uses: "1.1k", creator: "ProStudio Team", category: "Moody Studio" },
  { id: "p11", name: "Rooftop Golden Hour", color: "#C89050", aspect: "landscape", uses: "980", creator: "ProStudio Team", category: "Outdoor" },
  { id: "p12", name: "Raw Concrete", color: "#909090", aspect: "portrait", uses: "870", creator: "ProStudio Team", category: "Packshot" },
];

interface Props {
  brandId: string;
  brandName: string;
  brandColor: string;
}

export function PhysicalProductTab({ brandName }: Props) {
  const [selected, setSelected] = useState<Template | null>(null);
  const initials = brandName.split(" ").map((w) => w[0]).join("").slice(0, 3);

  return (
    <>
      <TemplateGrid templates={templates} categories={categories} onSelect={setSelected} />
      <TemplateModal
        template={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        type="physical"
        brandName={brandName}
        brandInitials={initials}
      />
    </>
  );
}
