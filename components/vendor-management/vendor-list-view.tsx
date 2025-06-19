"use client";

import { useEffect } from "react";

import { useVendorContext, type Vendor } from "@/context/vendor-context";
import { VendorToolbar } from "./vendor-toolbar";
import { VendorTable } from "./vendor-table";

type VendorListViewProps = {
  vendors: Vendor[];
  currentPage: number;
  hasNextPage: boolean;
  limit: number;
};

export function VendorListView({
  vendors,
  currentPage,
  hasNextPage,
  limit,
}: VendorListViewProps) {
  const { setVendors } = useVendorContext();

  useEffect(() => {
    setVendors(vendors);
  }, [vendors, setVendors]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Vendor List</h1>
      <VendorToolbar />
      <VendorTable
        vendors={vendors}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        limit={limit}
      />
    </div>
  );
}
