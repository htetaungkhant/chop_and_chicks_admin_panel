"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Wallet,
  Landmark,
  LaptopMinimalCheck,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useVendorContext, type Vendor } from "@/context/vendor-context";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatTime } from "@/lib/utils";

function InfoField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-gray-700 mb-1.5">{label}</p>
      <div className="w-full min-h-[48px] flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="text-sm text-gray-800 flex-1">{children || "N/A"}</div>
      </div>
    </div>
  );
}

const paymentMethodDetails = {
  credit_card_debit_card: {
    label: "Debit or Credit Card",
    icon: CreditCard,
  },
  wallet: {
    label: "Wallet",
    icon: Wallet,
  },
  net_banking: {
    label: "Net Banking",
    icon: Landmark,
  },
  upi: {
    label: "UPI",
    icon: LaptopMinimalCheck,
  },
};

export default function VendorDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { vendors } = useVendorContext();
  const vendorId = params.id as string;

  const [vendor, setVendor] = useState<Vendor | null | undefined>(() =>
    vendors.find((v: Vendor) => v.id === vendorId)
  );
  const [isLoading, setIsLoading] = useState(vendor === undefined);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isUnblockDialogOpen, setIsUnblockDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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

  const handleAccept = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("approve_reject_vendor_admin", {
      p_approval_status: "approved",
      p_reject_reason: null,
      p_vendor_id: vendorId,
    });

    if (error || data?.status === "error") {
      toast.error(
        error?.message ||
          data?.message ||
          "Failed to approve vendor. Please try again."
      );
      console.error(
        "Error approving vendor:",
        error || data?.message || "Failed to approve vendor. Please try again."
      );
      return;
    }
    setVendor((prev) =>
      prev ? { ...prev, approval_status: "approved" } : null
    );
    toast.success("Vendor has been approved successfully.");
  };

  const handleUnblock = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("approve_reject_vendor_admin", {
      p_approval_status: "approved",
      p_reject_reason: null,
      p_vendor_id: vendorId,
    });

    if (error || data?.status === "error") {
      toast.error(
        error?.message ||
          data?.message ||
          "Failed to unblock vendor. Please try again."
      );
      console.error(
        "Error unblocking vendor:",
        error || data?.message || "Failed to unblock vendor. Please try again."
      );
      return;
    }
    setVendor((prev) =>
      prev ? { ...prev, approval_status: "approved" } : null
    );
    toast.success("Vendor has been unblocked successfully.");
    setIsUnblockDialogOpen(false);
  };

  const handleBlock = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("approve_reject_vendor_admin", {
      p_approval_status: "blocked",
      p_reject_reason: null,
      p_vendor_id: vendorId,
    });

    if (error || data?.status === "error") {
      toast.error(
        error?.message ||
          data?.message ||
          "Failed to block vendor. Please try again."
      );
      console.error(
        "Error blocking vendor:",
        error || data?.message || "Failed to block vendor. Please try again."
      );
      return;
    }
    setVendor((prev) =>
      prev ? { ...prev, approval_status: "blocked" } : null
    );
    toast.success("Vendor has been blocked successfully.");
    setIsBlockDialogOpen(false);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.warning("Please provide a reason for rejection.");
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase.rpc("approve_reject_vendor_admin", {
      p_approval_status: "rejected",
      p_reject_reason: rejectReason,
      p_vendor_id: vendorId,
    });

    if (error || data?.status === "error") {
      toast.error(
        error?.message ||
          data?.message ||
          "Failed to reject vendor. Please try again."
      );
      console.error(
        "Error rejecting vendor:",
        error || data?.message || "Failed to reject vendor. Please try again."
      );
      return;
    }
    setVendor((prev) =>
      prev
        ? {
            ...prev,
            approval_status: "rejected",
            reject_reason: rejectReason,
          }
        : null
    );
    toast.success("Vendor has been rejected.");
    setIsRejectDialogOpen(false);
    setRejectReason("");
  };

  useEffect(() => {
    // If vendor is already loaded (from context or a previous fetch), do nothing.
    if (vendor) {
      setIsLoading(false);
      return;
    }
    // If vendor is null, it means we fetched and found nothing. Don't fetch again.
    if (vendor === null) {
      setIsLoading(false);
      return;
    }

    const fetchVendor = async () => {
      const supabase = createClient();
      const { data: response, error } = await supabase.rpc(
        "get_vendor_details_admin",
        {
          p_vendor_id: vendorId,
        }
      );

      if (error || response?.status === "error") {
        console.error(
          "Error fetching vendor details:",
          error ||
            response?.message ||
            "Failed to fetch vendor details. Please try again."
        );
        setVendor(null);
      } else {
        const vendorDetails = response?.data;
        if (vendorDetails) {
          setVendor(vendorDetails);
        } else {
          setVendor(null);
        }
      }
      setIsLoading(false);
    };

    fetchVendor();
  }, [vendorId, vendor]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading vendor details...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="text-center">
        <p className="mb-4">Vendor details not found.</p>
        <Link
          href={`/vendor-management${
            searchParams.size > 0 ? `?${searchParams.toString()}` : ""
          }`}
          className="text-blue-500 hover:underline"
        >
          Go back to vendor list
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Link
          href={`/vendor-management${
            searchParams.size > 0 ? `?${searchParams.toString()}` : ""
          }`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vendor List
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl text-red-600 font-bold">
              {vendor.shop_name}
            </h1>
            <p className="text-red-500 mt-1">{vendor.full_name}</p>
          </div>
          <div className="flex items-center gap-4">
            {vendor.approval_status === "approved" && (
              <Button
                onClick={() => setIsBlockDialogOpen(true)}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Block
              </Button>
            )}
            {vendor.approval_status === "blocked" && (
              <Button
                onClick={() => setIsUnblockDialogOpen(true)}
                variant="destructive"
                className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
              >
                Unblock
              </Button>
            )}
            {vendor.approval_status !== "pending" && (
              <Badge
                variant={statusVariant(vendor.approval_status)}
                className="text-base py-1 px-3"
              >
                {vendor.approval_status}
              </Badge>
            )}
            {vendor.approval_status === "pending" && (
              <div className="flex gap-2">
                <Button
                  onClick={handleAccept}
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                >
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsRejectDialogOpen(true)}
                  className="cursor-pointer"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="vendor-info">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-transparent p-0 h-16 gap-2">
            <TabsTrigger
              value="vendor-info"
              className="cursor-pointer text-red-600 font-bold border border-gray-300 rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              VENDOR INFORMATION
            </TabsTrigger>
            <TabsTrigger
              value="supply-info"
              className="cursor-pointer text-red-600 font-bold border border-gray-300 rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              SUPPLY INFORMATION
            </TabsTrigger>
            <TabsTrigger
              value="business-details"
              className="cursor-pointer text-red-600 font-bold border border-gray-300 rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              BUSINESS DETAILS
            </TabsTrigger>
            <TabsTrigger
              value="additional-info"
              className="cursor-pointer text-red-600 font-bold border border-gray-300 rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              ADDITIONAL INFORMATION
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <CardContent className="p-0">
              <TabsContent value="vendor-info" className="p-6 bg-gray-50">
                <div className="space-y-8">
                  <InfoField label="Vendor Name">
                    {vendor.full_name?.trim()}
                  </InfoField>
                  <InfoField label="Shop Name">
                    {vendor.shop_name?.trim()}
                  </InfoField>
                  <InfoField label="Shop Address">
                    {vendor.shop_address?.trim()}
                  </InfoField>
                  <InfoField label="City/Town">{vendor.city?.trim()}</InfoField>
                  <InfoField label="State">{vendor.state?.trim()}</InfoField>
                  <InfoField label="Pincode">
                    {vendor.postal_code?.trim()}
                  </InfoField>
                  <InfoField label="Email">{vendor.email}</InfoField>
                  <InfoField label="Contact Number">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>{vendor.contact_number}</span>
                    </div>
                  </InfoField>
                  <InfoField label="Alternate Contact Number">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>{vendor.alternate_contact_number}</span>
                    </div>
                  </InfoField>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1.5">
                      Shop Pictures
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {vendor.shop_pictures &&
                      vendor.shop_pictures.length > 0 ? (
                        vendor.shop_pictures.map((pic, index) => (
                          <a
                            href={pic?.image_url}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={pic?.thumbnail_url}
                              alt={`Shop picture ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                              width={96}
                              height={96}
                              priority
                            />
                          </a>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No pictures available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="supply-info" className="p-6 bg-gray-50">
                <div className="space-y-8">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Daily Sales Volume
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/chicken.svg"
                          alt="Chicken"
                          width={32}
                          height={32}
                        />
                        <p className="w-20 font-medium text-gray-800">
                          Chicken
                        </p>
                        <div className="w-24 text-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                          {vendor.daily_chicken_supply || 0}
                        </div>
                        <p className="text-sm text-gray-600">Kilograms</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Image
                          src="/mutton.svg"
                          alt="Mutton"
                          width={32}
                          height={32}
                        />
                        <p className="w-20 font-medium text-gray-800">Mutton</p>
                        <div className="w-24 text-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                          {vendor.daily_mutton_supply || 0}
                        </div>
                        <p className="text-sm text-gray-600">Kilograms</p>
                      </div>
                    </div>
                  </div>

                  <InfoField label="Primary Supplier/Source">
                    {vendor.primary_supply_source}
                  </InfoField>

                  <InfoField label="Cold Storage Available?">
                    {vendor.cold_storage_available ? "Yes" : "No"}
                  </InfoField>

                  <InfoField label="Home Delivery Service?">
                    {vendor.home_delivery_available ? "Yes" : "No"}
                  </InfoField>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-4">
                      Accepted Payment Methods
                    </p>
                    <div className="space-y-3">
                      {Object.entries(paymentMethodDetails).map(
                        ([key, { label, icon: Icon }]) => {
                          const isChecked =
                            vendor.payment_methods?.includes(key);
                          if (!isChecked) return null;

                          return (
                            <div
                              key={key}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center">
                                <Check size={16} />
                              </div>
                              <span className="font-medium text-gray-800">
                                {label}
                              </span>
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="business-details" className="p-6 bg-gray-50">
                <div className="space-y-8">
                  <InfoField label="Type of Vendor">
                    {vendor.vendor_type === "both"
                      ? "Both Chicken and Mutton"
                      : vendor.vendor_type}
                  </InfoField>

                  <InfoField label="Business Registration Number">
                    {vendor.business_registration_number}
                  </InfoField>

                  <InfoField label="FSSAI License Number">
                    {vendor.fssai_registration_number}
                  </InfoField>

                  <InfoField label="Years in Business">
                    {vendor.years_of_experience}
                  </InfoField>

                  <InfoField label="Shop Size (Square Feet)">
                    <div className="flex justify-between items-center w-full">
                      <span>{vendor.shop_size}</span>
                      <span className="text-gray-500 text-sm">Sq. Ft.</span>
                    </div>
                  </InfoField>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Shop Opening Hours
                    </p>
                    <div className="flex gap-4">
                      <div className="w-full">
                        <p className="text-xs text-gray-500 mb-1.5">
                          Opening Time
                        </p>
                        <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <span>{formatTime(vendor.opening_time).time}</span>
                          <span className="text-gray-500 text-sm">
                            {formatTime(vendor.opening_time).period}
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-xs text-gray-500 mb-1.5">
                          Closing Time
                        </p>
                        <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <span>{formatTime(vendor.closing_time).time}</span>
                          <span className="text-gray-500 text-sm">
                            {formatTime(vendor.closing_time).period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Weekly Off Day
                    </p>
                    <div className="flex flex-wrap gap-8">
                      {vendor.off_days && vendor.off_days.length > 0 ? (
                        vendor.off_days.map((day) => (
                          <div key={day} className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-md flex items-center justify-center">
                              <Check size={16} />
                            </div>
                            <span className="text-sm font-medium capitalize">
                              {day}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No off days</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="additional-info" className="p-6 bg-gray-50">
                <div className="space-y-8">
                  <InfoField label="Hygiene Certification Available?">
                    {vendor.hygiene_certification_available ? "Yes" : "No"}
                  </InfoField>
                  <InfoField label="Additional Comments">
                    {vendor.additional_comments}
                  </InfoField>
                  <InfoField label="Vendor Signature">
                    {vendor.vendor_signature && vendor.vendor_signature !== "{}"
                      ? vendor.vendor_signature
                      : "No signature available"}
                  </InfoField>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Vendor</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this vendor. This will be
              shared with the vendor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to block this vendor?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will prevent the vendor from accessing their account. This
              action can be undone later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlock}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isUnblockDialogOpen}
        onOpenChange={setIsUnblockDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to unblock this vendor?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will allow the vendor to access their account. This action
              can be undone later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnblock}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
