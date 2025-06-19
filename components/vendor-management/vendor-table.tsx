"use client";

import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
              <TableHead className="font-bold">S.no.</TableHead>
              <TableHead className="font-bold">Vendor Name</TableHead>
              <TableHead className="font-bold">Shop Name</TableHead>
              <TableHead className="font-bold">Phone No</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold text-center">Action</TableHead>
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
                  <TableCell className="text-center">
                    <Link
                      href={`/vendor-management/${vendor.id}${
                        searchParams.size > 0
                          ? `?${searchParams.toString()}`
                          : ""
                      }`}
                    >
                      <button className="text-gray-200 hover:text-white cursor-pointer">
                        <Info className="h-5 w-5 bg-red-500 rounded-full" />
                      </button>
                    </Link>
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
                  <PaginationPrevious href={createPageURL(currentPage - 1)} />
                </PaginationItem>
              )}
              <PaginationItem>
                <span className="px-4 py-2 text-sm font-bold bg-[#fdf2d6] rounded-md">
                  {currentPage}
                </span>
              </PaginationItem>
              {hasNextPage && (
                <PaginationItem>
                  <PaginationNext href={createPageURL(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
