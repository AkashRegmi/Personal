const SingleOrderModel = ({ isOpen, onClose, order }) => {
 
  if (!isOpen || !order) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      {/* Drawer */}
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Order #{order._id?.slice(-8)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Order ID */}
          <div className="mb-6 rounded-xl border bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Order ID
            </p>

            <p className="mt-1 break-all text-sm font-medium text-gray-900">
              {order._id}
            </p>
          </div>

          {/* Status */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm font-medium text-gray-500">Order Status</p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm font-medium text-gray-500">
                Payment Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                  order.paymentStatus,
                )}`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Customer Information
            </h3>

            <div className="rounded-xl border p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order.user?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="break-all text-sm font-medium text-gray-900">
                    {order.user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">User ID</p>
                  <p className="break-all text-xs text-gray-500">
                    {order.user?._id || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Shipping Address
            </h3>

            <div className="rounded-xl border p-4">
              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.fullName || "N/A"}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress?.address || "N/A"}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.postalCode}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress?.country || "N/A"}
                </p>

                <p className="pt-1 text-gray-600">
                  Phone: {order.shippingAddress?.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Order Items
              </h3>

              <span className="text-xs text-gray-500">
                {order.items?.length || 0} item(s)
              </span>
            </div>

            <div className="space-y-3">
              {order.items?.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={item.product?._id || item.product || index}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Product {index + 1}
                        </p>

                        <p className="mt-1 break-all text-xs text-gray-500">
                          Product ID:{" "}
                          {item.product?._id || item.product || "N/A"}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          × {item.quantity}
                        </p>

                        <p className="text-xs text-gray-500">Quantity</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed p-6 text-center">
                  <p className="text-sm text-gray-500">No items found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 rounded-xl bg-gray-900 p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Total Amount</span>

              <span className="text-2xl font-bold">
                ${Number(order.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Order Timeline
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Order Created
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>

                <p className="mt-1 text-sm text-gray-800">
                  {formatDate(order.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderModel;
