import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products?.products?.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          No products found
        </h2>

        <p className="mt-2 text-gray-500">Try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
