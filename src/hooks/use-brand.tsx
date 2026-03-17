import { createContext, useContext, useState, type ReactNode } from "react";

export interface Brand {
  id: string;
  name: string;
  color: string; // tailwind-friendly color class
}

interface BrandContextType {
  brands: Brand[];
  activeBrand: Brand | null;
  setActiveBrand: (brand: Brand) => void;
  hasBrands: boolean;
}

const defaultBrands: Brand[] = [
  { id: "1", name: "Nordform", color: "bg-[#2D4A3E]" },
  { id: "2", name: "Sthlm Studio", color: "bg-[#1A3A5C]" },
];

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brands] = useState<Brand[]>(defaultBrands);
  const [activeBrand, setActiveBrand] = useState<Brand>(defaultBrands[0]);

  return (
    <BrandContext.Provider value={{ brands, activeBrand, setActiveBrand, hasBrands: brands.length > 0 }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
