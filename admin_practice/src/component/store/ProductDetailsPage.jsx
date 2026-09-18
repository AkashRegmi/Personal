import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useGetproductById } from "../../hooks/useProducts";
import Loading from "../common/ThreeDotLoading";
import NotFound from "../common/NotFound";
import { useAuth } from "../../hooks/useAuth";
import { useAddToCart } from "../../hooks/useCart";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const addToCartMutation = useAddToCart();
  const navigate = useNavigate();
  const {
    data: product,
    isError,
    error,
    isLoading,
  } = useGetproductById(productId);

  if (isLoading) {
    return <Loading text="Loading Product" />;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Failed to load product
        </h2>

        <p className="mt-2 text-gray-500">
          {error?.response?.data?.message ||
            error?.message ||
            "Something went wrong."}
        </p>
      </div>
    );
  }

  if (!product) {
    return <NotFound title="Product Not Found" />;
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const isOutOfStock = product.stock <= 0;
  const handleAddtoCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add products to your cart");
      navigate("/login");

      return;
    }
    if (isOutOfStock) {
      toast.error("This product is out of stock");

      return;
    }
    addToCartMutation.mutate(
      {
        productId: productId,
        quantity: quantity,
      },

      // ------------------------------------------------------
      // SUCCESS / ERROR FOR THIS PARTICULAR REQUEST
      // ------------------------------------------------------

      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`);
        },

        onError: (error) => {
          const message =
            error?.response?.data?.message || "Failed to add product to cart";

          toast.error(message);
        },
      },
    );
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Back */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#293354]"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        {/* Product */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <div className="relative flex min-h-[450px] items-center justify-center bg-gray-100 p-8">
              {product.isFeatured && (
                <span className="absolute left-6 top-6 rounded-full bg-[#293354] px-4 py-2 text-sm font-semibold text-white">
                  Featured
                </span>
              )}

              {product.image?.url ? (
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="max-h-[500px] w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No Image Available</div>
              )}
            </div>

            {/* Product Information */}
            <div className="p-8 md:p-10">
              {/* Category */}
              <div className="mb-3 flex items-center gap-3">
                {product.category && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {product.category}
                  </span>
                )}

                {product.brand && (
                  <span className="text-sm text-gray-500">
                    Brand:{" "}
                    <span className="font-medium text-gray-700">
                      {product.brand}
                    </span>
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-6">
                <span className="text-3xl font-bold text-[#293354]">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>

              {/* Stock */}
              <div className="mt-4">
                {isOutOfStock ? (
                  <span className="font-semibold text-red-600">
                    Out of Stock
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="font-semibold text-orange-600">
                    Only {product.stock} left in stock
                  </span>
                ) : (
                  <span className="font-semibold text-green-600">In Stock</span>
                )}
              </div>

              {/* Description */}
              <div className="mt-8 border-t pt-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="leading-7 text-gray-600">{product.description}</p>
              </div>

              {/* Quantity */}
              {!isOutOfStock && (
                <div className="mt-8">
                  <p className="mb-3 text-sm font-semibold text-gray-700">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                      className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="min-w-12 text-center font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddtoCart}
                  disabled={isOutOfStock || addToCartMutation.isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#293354] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <ShoppingCart size={20} />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#293354] px-6 py-3 font-semibold text-[#293354] transition hover:bg-[#293354] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                >
                  <Zap size={20} />
                  Buy Now
                </button>
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="mt-8 border-t pt-6">
                  <h2 className="mb-3 text-sm font-semibold text-gray-700">
                    Tags
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
