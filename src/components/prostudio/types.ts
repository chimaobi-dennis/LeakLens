export interface Template {
  id: string;
  name: string;
  color: string;
  aspect: "square" | "portrait" | "landscape";
  uses: string;
  creator: string;
  category: string;
}

export interface TemplateModalProps {
  template: Template | null;
  open: boolean;
  onClose: () => void;
  type: "physical" | "digital";
  brandName: string;
  brandInitials: string;
}
