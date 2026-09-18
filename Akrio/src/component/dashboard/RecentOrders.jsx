const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  processing: "bg-blue-50 text-blue-700",
  shipped: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[normalizedStatus] ||
        "bg-gray-50 text-gray-600"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest orders from your customers
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center p-6">
          <p className="text-sm text-gray-400">
            No recent orders
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Items
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Payment
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.name || "Unknown"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.user?.email || "No email"}
                      </p>
                    </div>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    ) || 0}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      Rs.{" "}
                      {order.totalAmount?.toLocaleString() ?? 0}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.paymentStatus} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;