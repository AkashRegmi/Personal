const CartItem = ({ item }) => {
  const product = item.product;

  return (
    <div className="flex gap-4 border-b border-gray-200 py-5">
      {/* Product Image */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product?.image?.url}
          alt={product?.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {product?.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Rs. {product?.price}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Quantity: {item.quantity}
          </p>
        </div>

        {/* Item Total */}
        <div className="font-semibold text-gray-900">
          Rs. {product?.price * item.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItem;