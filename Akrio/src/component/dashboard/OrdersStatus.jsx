import {
  Clock,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-600",
  },

  processing: {
    label: "Processing",
    icon: PackageCheck,
    className: "bg-blue-50 text-blue-600",
  },

  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-purple-50 text-purple-600",
  },

  delivered: {
    label: "Delivered",
    icon: PackageCheck,
    className: "bg-green-50 text-green-600",
  },

  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-600",
  },
};

const OrdersStatus = ({ ordersByStatus = [] }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Orders Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Orders grouped by status
        </p>
      </div>

      {ordersByStatus.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-gray-400">
            No order status data available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {ordersByStatus.map((item) => {
            const config =
              statusConfig[item.status?.toLowerCase()] ?? {
                label: item.status || "Unknown",
                icon: PackageCheck,
                className: "bg-gray-50 text-gray-600",
              };

            const Icon = config.icon;

            return (
              <div
                key={item.status}
                className="rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      {config.label}
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {item.count}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersStatus;