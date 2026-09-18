import { Download, Package, Plus, Search } from "lucide-react";

const ProductPageHeader = ({
  onAddProduct,
  onSearchProduct,
  apiProducts,
  handleExport,
  isExporting,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#293354] text-white">
            <Package size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your products and inventory
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#293354] focus:bg-white focus:ring-2 focus:ring-[#293354]/10 sm:w-64"
              onChange={onSearchProduct}
            />
          </div>

          {/* Export */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download size={18} />
            {isExporting ? "Exporting..." : "Export"}
          </button>

          {/* Add Product */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#293354] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202943]"
            onClick={onAddProduct}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Bottom information */}
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">
          Manage your inventory from one place
        </p>

        <p className="text-xs font-medium text-gray-600">
          Total Products:{" "}
          <span className="text-[#293354]">{apiProducts?.total}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductPageHeader;
