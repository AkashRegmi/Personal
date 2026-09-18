import { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { useDebounce } from "../hooks/useDebounce";
import { Package, Search } from "lucide-react";
import { OrderCard } from "../component/orders/OrderCard";

const CustomerOrderPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const debounceSearchTerm = useDebounce(search, 500);
  const { data, isLoading, isError, error } = useOrders(
    limit,
    page,
    debounceSearchTerm,
  );
  const orders = data?.orders || [];

  return (
    <div className=" min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          {" "}
          <h1 className="text-2xl font-bold text-gray-900"> My Orders </h1>{" "}
          <p className="mt-1 text-sm text-gray-500">
            {" "}
            View and track your recent orders{" "}
          </p>{" "}
        </div>
      </div>
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
        {" "}
        <div className="relative">
          {" "}
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />{" "}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search your orders..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-[#293354]"
          />{" "}
        </div>{" "}
        {isLoading && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            {" "}
            <p className="text-gray-500"> Loading your orders... </p>{" "}
          </div>
        )}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            {" "}
            <p className="font-medium text-red-600">
              {" "}
              {error?.response?.data?.message || "Failed to load orders"}{" "}
            </p>{" "}
          </div>
        )}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            {" "}
            <Package size={48} className="mx-auto text-gray-300" />{" "}
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {" "}
              No orders found{" "}
            </h2>{" "}
            <p className="mt-1 text-sm text-gray-500">
              {" "}
              You haven't placed any orders yet.{" "}
            </p>{" "}
          </div>
        )}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="space-y-5">
            {" "}
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderPage;
