"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ShopPicture = {
  id: string;
  image_url: string;
  thumbnail_url: string;
  vendor_id: string;
  created_at: string;
  updated_at: string;
};

export type Vendor = {
  id: string;
  full_name: string | null;
  shop_name: string | null;
  contact_number: string | null;
  alternate_contact_number: string | null;
  email: string | null;
  shop_address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  vendor_type: string | null;
  daily_chicken_supply: number | null;
  daily_mutton_supply: number | null;
  primary_supply_source: string | null;
  business_registration_number: string | null;
  fssai_registration_number: string | null;
  years_of_experience: number | null;
  shop_size: number | null;
  opening_time: string | null;
  closing_time: string | null;
  off_days: string[] | null;
  payment_methods: string[] | null;
  cold_storage_available: boolean | null;
  home_delivery_available: boolean | null;
  hygiene_certification_available: boolean | null;
  additional_comments: string | null;
  vendor_signature: string | null;
  shop_pictures: ShopPicture[] | null;
  approval_status: "pending" | "approved" | "rejected" | "blocked";
  is_available: boolean;
  reject_reason: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  sign_up_phase: string;
  fcm_token: string | null;
};

type VendorContextType = {
  vendors: Vendor[];
  setVendors: (vendors: Vendor[]) => void;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export function VendorProvider({ children }: { children: ReactNode }) {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  return (
    <VendorContext.Provider value={{ vendors, setVendors }}>
      {children}
    </VendorContext.Provider>
  );
}

export function useVendorContext() {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error("useVendorContext must be used within a VendorProvider");
  }
  return context;
}
