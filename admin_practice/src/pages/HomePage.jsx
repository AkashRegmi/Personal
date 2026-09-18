import ProductCard from "../component/store/ProductCard";
import ProductSkeleton from "../component/store/ProductSkeleton";
import { useCustomerProducts } from "../hooks/useProducts";

const HomePage = () => {
  const { data, isLoading, isError, error } = useCustomerProducts();

  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#293354] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
            Discover Products You'll Love
          </h1>

          <p className="mt-4 max-w-xl text-gray-200">
            Explore our collection of quality products at great prices.
          </p>

          <button className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-[#293354] transition hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-2 text-gray-500">
            Check out some of our latest products.
          </p>
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
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
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
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No products available
            </h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
