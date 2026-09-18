import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  return (
    <Link
      to={`/products/${product._id}`}
      className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <p className="mt-4 text-lg font-bold text-[#293354]">
          Rs. {product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
