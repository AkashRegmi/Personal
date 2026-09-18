import { Package } from "lucide-react";

const TopCategories = ({ categories = [] }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Top Categories
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Products and inventory by category
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-gray-400">
            No category data available
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((item, index) => (
            <div
              key={`${item.category}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <Package className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <p className="font-medium capitalize text-gray-900">
                    {item.category || "Uncategorized"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.products}{" "}
                    {item.products === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {item.inventory?.toLocaleString() ?? 0}
                </p>

                <p className="text-xs text-gray-500">
                  inventory
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCategories;