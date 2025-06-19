"use client";

import { VendorProvider } from "@/context/vendor-context";

export default function VendorManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VendorProvider>{children}</VendorProvider>;
}
