
const SingleProductModel = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      {/* Drawer */}
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Product Details
            </h2>
            <p className="text-sm text-gray-500">View product information</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Content */} 
        <div className="flex-1 overflow-y-auto p-6">
          {/* Product Image */}
          <div className="mb-6 overflow-hidden rounded-xl border bg-gray-50">
            <img
              src={product.image?.url}
              alt={product.name}
              className="h-64 w-full object-contain"
            />
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>

            <p className="mt-1 break-all text-xs text-gray-400">
              ID: {product._id}
            </p>
          </div>

          {/* Price */}
          <div className="mb-6 rounded-xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Price</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              ${product.price?.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">
              Description
            </h4>

            <p className="text-sm leading-6 text-gray-600">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Tags</h4>

            <div className="flex flex-wrap gap-2">
              {product.tags?.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">
                  No tags available.
                </span>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="border-t pt-6">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="mt-1 text-sm text-gray-800">
                {formatDate(product.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="mt-1 text-sm text-gray-800">
                {formatDate(product.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductModel;
