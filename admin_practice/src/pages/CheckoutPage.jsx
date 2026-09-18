import CheckoutForm from "../component/checkout/CheckoutForm";
import CheckoutSummary from "../component/checkout/CheckoutSummary";
import { useCart } from "../hooks/useCart";

const CheckoutPage = () => {
  const { data, isLoading, isError } = useCart();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">Loading checkout...</div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        Failed to load checkout.
      </div>
    );
  }

  const items = data?.cart?.items || [];
 
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm items={items} />
          </div>

          <div>
            <CheckoutSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
