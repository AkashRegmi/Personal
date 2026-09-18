import CartItem from "../component/cart/CartItem";
import CartSummary from "../component/cart/CartSummary";
import Loading from "../component/common/ThreeDotLoading";
import { useCart } from "../hooks/useCart";

export const CartPage = () => {
  const { data, isLoading, isError } = useCart();
  if (isLoading) {
    return <Loading text="Loading Cart" />;
  }
  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>

        <div className="mt-8 rounded-lg bg-red-50 p-4 text-red-600">
          Failed to load your cart.
        </div>
      </div>
    );
  }
  const items = data?.cart?.items || [];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>

          <p className="mt-2 text-gray-500">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to your cart to see them here.
            </p>

            <button className="mt-6 rounded-lg bg-[#293354] px-6 py-3 font-medium text-white hover:opacity-90">
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Cart Items
              </h2>

              <div className="mt-4">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <CartSummary items={items} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
