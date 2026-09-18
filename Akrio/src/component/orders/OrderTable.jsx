
import { useState } from "react";
import NotFound from "../common/NotFound";
import Loading from "../common/ThreeDotLoading";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Pagination from "../common/Pagination";

const OrderTable = ({
  orders,
  isPending,
  handelDelete,
  handelviewbutton,
  page,
  onPageChange,
}) => {
  const [isVerticalButtonOpen, setVerticalButtonOpen] = useState();
  return (
    <div className=" border-gray-400 rounded-2xl shadow-sm  bg-white">
      {isPending ? (
        <div className=" flex items-center min-h-100 justify-center">
          <Loading text="Loading Orders" />
        </div>
      ) : !orders?.orders?.length ? (
        <NotFound title="Orders not Found" />
      ) : (
        <div className=" overflow-x-auto md:block">
          {" "}
          <table className="w-full min-w-225 text-left">
            <thead className=" border-b border-blue-400">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order Id
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  User Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Total Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Payment Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100  ">
              {orders?.orders?.map((order) => (
                <tr
                  key={order._id}
                  className=" transition hover:bg-gray-50 cursor:pointer "
                  onClick={() => handelviewbutton(order)}
                >
                  <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black-500">
                    {order?._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold  tracking-wider text-black-500">
                    {order.user.name}
                  </td>
                  <td className="px-6 py-4">
                    {order.status === "pending" ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700">
                        Pending
                      </span>
                    ) : order.status === "completed" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        Completed
                      </span>
                    ) : order.status === "cancelled" ? (
                      <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                        Cancelled
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black-500">
                    {order?.createdAt.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black-500">
                    {order?.totalAmount}
                  </td>{" "}
                  <td className="px-6 py-4">
                    {order.paymentStatus === "pending" ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-700">
                        Pending
                      </span>
                    ) : order.paymentStatus === "completed" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                        Completed
                      </span>
                    ) : order.paymentStatus === "cancelled" ? (
                      <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                        Cancelled
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit size={17} />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        onClick={(event) => {
                          (event.stopPropagation(), handelDelete(order));
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                      <div className=" relative">
                        {" "}
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100"
                          onClick={() => {
                            setVerticalButtonOpen(
                              isVerticalButtonOpen === order?._id
                                ? null
                                : order?._id,
                            );
                          }}
                        >
                          <MoreVertical size={17} />
                        </button>
                        {isVerticalButtonOpen === order?._id && (
                          <div className="absolute right-0 top-10 z-50 w-32 rounded-lg border bg-white p-1 shadow-lg">
                            <button
                              type="button"
                              className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={(event) => {
                                (handelviewbutton(order),
                                  event.stopPropagation(),
                                  setVerticalButtonOpen(null));
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
            {orders?.total || 9}
          </span>{" "}
          products
        </p>

        <Pagination
          totalpage={orders?.pagination?.totalPages}
          page={page}
          disable={isPending}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default OrderTable;
