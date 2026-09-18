import { Edit, MoreVertical, Trash2 } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
// import { products } from "../../dummyData/product.service";
import Loading from "../common/ThreeDotLoading";
import NotFound from "../common/NotFound";
import { useState } from "react";
import { extractDate } from "../../helper/DateFormatter";
import Pagination from "../common/Pagination";

const ProductTable = ({
  apiProducts,
  isPending,
  handelDeleteIcon,
  handalEditIcon,
  handelViewButton,
  page,
  onPageChange,
}) => {
  const [isVerticalButtonOpen, setVerticalButtonOpen] = useState(null);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {isPending ? (
        <div className=" flex min-h-100 items-center justify-center">
          <Loading
            text="Loading products..."
            size="lg"
            color="bg-[#293354]"
            gap="gap-4"
          />
        </div>
      ) : !apiProducts?.products?.length ? (
        <NotFound />
      ) : (
        <div className="  overflow-x-auto md:block">
          <table className="w-full min-w-225 text-left">
            <thead className="border-b border-blue-600 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Addeed Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 ">
              {apiProducts?.products.map((product) => (
                <tr
                  key={product._id}
                  className="transition hover:bg-gray-50"
                  onClick={() => handelViewButton(product)}
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={product?.image?.url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                      {product?.tags[0]}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ${product.price.toLocaleString()}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {product?.stock || 10}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {product.stock === 0 ? (
                      <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                        Out of stock
                      </span>
                    ) : product.stock <= 10 ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700">
                        Low stock
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        In stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {product?.createdAt
                      ? extractDate(product.createdAt)
                      : extractDate(Date)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                        onClick={(event) => {
                          (event.stopPropagation(), handalEditIcon(product));
                        }}
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        onClick={(event) => {
                          (event.stopPropagation(), handelDeleteIcon(product));
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                      <div className=" relative">
                        {" "}
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
                          onClick={() =>
                            setVerticalButtonOpen(
                              isVerticalButtonOpen === product?._id
                                ? null
                                : product._id,
                            )
                          }
                        >
                          <MoreVertical size={17} />
                        </button>
                        {isVerticalButtonOpen === product?._id && (
                          <div className="absolute right-0 top-10 z-50 w-32 rounded-lg border bg-white p-1 shadow-lg">
                            <button
                              type="button"
                              className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handelViewButton(product);
                                setVerticalButtonOpen(null);
                              }}
                            >
                              View
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {apiProducts?.total || 9}
          </span>{" "}
          products
        </p>

        <Pagination
          totalpage={apiProducts?.pagination?.totalPages}
          page={page}
          disable={isPending}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductTable;
