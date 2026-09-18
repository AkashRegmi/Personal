import { useNavigate } from "react-router-dom";

const CartSummary = ({ items }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      <div className="mt-5 flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>

      <div className="my-4 border-t border-gray-200" />

      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span>Rs. {subtotal}</span>
      </div>

      <button
        className="mt-6 w-full rounded-lg bg-[#293354] px-4 py-3 font-medium text-white transition hover:opacity-90"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
