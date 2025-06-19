import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { VendorTable } from "./vendor-table";
import { VendorToolbar } from "./vendor-toolbar";

export default async function VendorManagementPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
    status?: string;
  };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const searchText = searchParams?.search || "";
  const vendorStatus =
    searchParams?.status === "all" ? null : searchParams?.status || null;

  const { data: response, error } = await supabase.rpc(
    "get_all_vendors_admin",
    {
      p_limit: limit + 1, // Fetch one extra to check for next page
      p_offset: offset,
      p_text_search: searchText,
      p_vendor_status: vendorStatus,
    }
  );

  if (error) {
    console.error("Error fetching vendors:", error);
  }

  const vendors = response?.data?.slice(0, limit) || [];
  const hasNextPage = (response?.data?.length || 0) > limit;

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
