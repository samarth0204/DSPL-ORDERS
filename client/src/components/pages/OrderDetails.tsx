import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import type { Order } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import GetBadge from "../common/GetBadge";

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<Order>({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await api.get(`/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto mt-12 space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-destructive mt-12">
        Error loading order details.
      </div>
    );

  if (!order) return <div className="text-center mt-12">No order found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            {order.clientName}
            <GetBadge order={order} />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Order Id:</span> {order.id}
          </div>
          <div>
            <span className="font-semibold">Salesman:</span>{" "}
            {order.salesman?.username || order.salesmanId || "-"}
          </div>
          <div>
            <span className="font-semibold">Order Date:</span>{" "}
            {order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}
          </div>
          <div>
            <span className="font-semibold">Town:</span>{" "}
            {order.deliveryDetails || "-"}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Transport / Notes:</span>{" "}
            {order.description || "-"}
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <div>
        <h2 className="text-xl font-semibold mb-3 border-b pb-1">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {order.products?.map((p, idx) => (
            <Card
              key={p.id || idx}
              className="bg-white border shadow-sm hover:shadow-md transition duration-200"
            >
              <CardContent className="flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    {p.name} ({p.size})
                  </div>
                  {p.rate && (
                    <div className="text-xs text-gray-500">Rate: ₹{p.rate}</div>
                  )}
                </div>
                <div className="text-sm font-semibold">Qty: {p.quantity}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fulfillments */}
      <div>
        <h2 className="text-xl font-semibold mb-3 border-b pb-1">
          Fulfillments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {order.fulfillments?.length ? (
            order.fulfillments.map((f, idx) => (
              <Card
                key={f.id || idx}
                className="bg-white border shadow-sm hover:shadow-md transition duration-200"
              >
                <CardContent className="flex justify-between items-center">
                  <div className="font-medium">
                    Bill #{f.billNumber || f.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {f.date ? new Date(f.date).toLocaleString() : "-"}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No dispatches yet.</span>
          )}
        </div>
      </div>
    </div>
  );
}
