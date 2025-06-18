import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderChart } from "@/components/order-chart";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 px-6">
            <Image src="/total_users.svg" alt="Total Users" width={48} height={48} />
            <div>
              <p className="text-4xl font-bold text-red-600">1248</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 px-6">
            <Image src="/total_vendors.svg" alt="Total Vendors" width={48} height={48} />
            <div>
              <p className="text-4xl font-bold text-red-600">124</p>
              <p className="text-sm text-muted-foreground">Total Vendors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 px-6">
            <Image src="/total_orders.svg" alt="Total Orders" width={48} height={48} />
            <div>
              <p className="text-4xl font-bold text-red-600">2430</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 px-6">
            <Image src="/active_deliveries.svg" alt="Active Deliveries" width={48} height={48} />
            <div>
              <p className="text-4xl font-bold text-red-600">34</p>
              <p className="text-sm text-muted-foreground">Active Deliveries</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <OrderChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Image src="/daily_average_orders.svg" alt="Daily Average Orders" width={64} height={64} />
            <div>
              <p className="text-4xl font-bold text-red-600">78</p>
              <p className="text-sm text-muted-foreground">Daily Average Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Image src="/daily_active_vendors.svg" alt="Daily Active Vendors" width={64} height={64} />
            <div>
              <p className="text-4xl font-bold text-red-600">48</p>
              <p className="text-sm text-muted-foreground">Daily Active Vendors</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
