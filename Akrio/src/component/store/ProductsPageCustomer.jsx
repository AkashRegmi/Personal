import { useState } from "react";
import ProductGrid from "../../component/store/ProductGrid";
import ProductSkeleton from "../../component/store/ProductSkeleton";
import { useCustomerProducts } from "../../hooks/useProducts";
import { Search } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../common/Pagination";

const ProductsPageCustomer = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const debounce = useDebounce(search, 500);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useCustomerProducts(debounce, page, limit);

  const handelOnpagechange = (data) => {
    setPage(data);
  };
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 ">
        <div className=" grid  grid-cols-1 lg:grid-cols-2">
          {" "}
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>

            <p className="mt-2 text-gray-500">
              Find the products you're looking for.
            </p>
          </div>
          {/* Search */}
          <div className="relative mb-8 max-w-md flex items-center">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-[#293354] focus:ring-1 focus:ring-[#293354]"
            />
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}
        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-600">
              Failed to load products
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong."}
            </p>
          </div>
        )}
        {/* Products */}
        {!isLoading && !isError && <ProductGrid products={products} />}
        <Pagination
          totalpage={products?.pagination?.totalPages}
          page={page}
          onPageChange={handelOnpagechange}
        />
      </div>
    </section>
  );
};

export default ProductsPageCustomer;
