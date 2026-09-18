const CheckoutSummary = ({ items }) => {
  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between gap-4"
          >
            <div>
              <p className="font-medium text-gray-900">
                {item.product.name}
              </p>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-medium">
              Rs. {item.product.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-gray-200" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>Rs. {subtotal}</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;