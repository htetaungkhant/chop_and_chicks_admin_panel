"use client";

import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

type Vendor = {
  id: string;
  full_name: string | null;
  shop_name: string | null;
  contact_number: string | null;
  approval_status: "pending" | "approved" | "rejected" | "blocked";
};

type VendorTableProps = {
  vendors: Vendor[];
  currentPage: number;
  hasNextPage: boolean;
  limit: number;
};

export function VendorTable({
  vendors,
  currentPage,
  hasNextPage,
  limit,
}: VendorTableProps) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/vendor-management?${params.toString()}`;
  };

  const statusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "blocked":
        return "blocked";
      default:
        return "outline";
    }
  };

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.no.</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <TableRow key={vendor.id}>
                  <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {vendor.full_name?.trim() || "N/A"}
                  </TableCell>
                  <TableCell>{vendor.shop_name?.trim() || "N/A"}</TableCell>
                  <TableCell>
                    {vendor.contact_number?.trim() || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(vendor.approval_status)}>
                      {vendor.approval_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Info className="h-5 w-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No vendors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {(currentPage > 1 || hasNextPage) && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={createPageURL(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              <PaginationItem>
                <span className="px-4 py-2 text-sm font-bold bg-[#fdf2d6] rounded-md">
                  {currentPage}
                </span>
              </PaginationItem>
              {hasNextPage && (
                <PaginationItem>
                  <PaginationNext
                    href={createPageURL(currentPage + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
