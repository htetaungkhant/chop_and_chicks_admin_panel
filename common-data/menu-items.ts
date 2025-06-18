import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  MessageSquareQuoteIcon,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Vendor Management",
    href: "/vendor-management",
    icon: Users,
  },
  {
    name: "Order Management",
    href: "/order-management",
    icon: ShoppingBag,
  },
  {
    name: "Queries",
    href: "/queries",
    icon: MessageSquareQuoteIcon,
  },
];
