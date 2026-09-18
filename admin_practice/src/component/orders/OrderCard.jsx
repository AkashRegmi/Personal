import { CalendarDays, MapPin, Package } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

export const OrderCard = ({ order }) => {
  const orderDate = new Date(order.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            #{order._id}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-gray-100">
        {order.items?.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 p-5"
          >
            {/* Product Image */}
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package
                    size={28}
                    className="text-gray-400"
                  />
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900">
                {item.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700">
                Rs. {item.price.toLocaleString()}
              </p>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                Rs.{" "}
                {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Date */}
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-gray-500"
            />

            <div>
              <p className="text-xs text-gray-500">
                Ordered On
              </p>

              <p className="text-sm font-medium text-gray-900">
                {orderDate}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin
              size={18}
              className="mt-0.5 text-gray-500"
            />

            <div>
              <p className="text-xs text-gray-500">
                Delivery Address
              </p>

              <p className="text-sm font-medium text-gray-900">
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="font-medium text-gray-700">
            Order Total
          </span>

          <span className="text-lg font-bold text-[#293354]">
            Rs. {order.totalAmount?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};



