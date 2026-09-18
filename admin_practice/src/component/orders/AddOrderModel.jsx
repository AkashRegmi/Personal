import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../../schemas/order.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounce";
import { useProductsWithOutPagination } from "../../hooks/useProducts";
import { useState } from "react";
import { addOrder } from "../../services/orders.services";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
const AddOrderModel = ({ isOpen, onClose }) => {
  const [searchWord, setsearchWord] = useState("");
  const queryClient = useQueryClient();
  const debounceSearchTerm = useDebounce(searchWord, 500);
  const {
    data,
    isPending,
    error: productsError,
  } = useProductsWithOutPagination(debounceSearchTerm);
  const products = data?.products || [];
  const handleClose = () => {
    reset();
    onClose();
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [
        {
          product: "",
          quantity: 1,
        },
      ],

      shippingAddress: {
        fullName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Nepal",
      },

      paymentStatus: "pending",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const addOrderMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      toast.success(data?.message || "Order created successfully");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      reset();

      onClose();
    },
    onError: (error) => {
      const serverError = error?.response?.data?.message;

      toast.error(serverError || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (orderData) => {
    addOrderMutation.mutate(orderData);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Order"
      description="Create a new customer order."
      size="md"
    >
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("Validation errors:", errors);
        })}
        className="space-y-6 p-6"
      >
        {/* ================================================== */}
        {/* PRODUCTS */}
        {/* ================================================== */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700">
              Products
            </label>

            <button
              type="button"
              onClick={() =>
                append({
                  product: "",
                  quantity: 1,
                })
              }
              className="text-sm font-medium text-[#293354] hover:underline"
            >
              + Add Product
            </button>
          </div>

          {/* PRODUCT ITEMS */}

          <div className="space-y-4">
            {fields.map((field, index) => {
              
              const selectedProductId = watch(`items.${index}.product`);

              // ------------------------------------
              // FIND PRODUCT
              // ------------------------------------

              const selectedProduct = products.find(
                (product) => product._id === selectedProductId,
              );

              // ------------------------------------
              // QUANTITY
              // ------------------------------------

              const quantity = Number(watch(`items.${index}.quantity`)) || 0;

              // ------------------------------------
              // SUBTOTAL
              // ------------------------------------

              const subtotal = selectedProduct
                ? selectedProduct.price * quantity
                : 0;

              return (
                <div
                  key={field.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  {/* PRODUCT SELECT */}

                  <div>
                    <label
                      htmlFor={`product-${index}`}
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Product
                    </label>

                    <select
                      id={`product-${index}`}
                      {...register(`items.${index}.product`)}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
                    >
                      <option value="">
                        {isPending ? "Loading products..." : "Select product"}
                      </option>

                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name} - Rs. {product.price}
                        </option>
                      ))}
                    </select>

                    {errors.items?.[index]?.product && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.items[index].product.message}
                      </p>
                    )}
                  </div>

                  {/* ================================================== */}
                  {/* PRICE + QUANTITY */}
                  {/* ================================================== */}

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* PRICE */}

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Price
                      </label>

                      <input
                        type="text"
                        value={
                          selectedProduct ? `Rs. ${selectedProduct.price}` : ""
                        }
                        placeholder="Select product"
                        readOnly
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm text-gray-700 outline-none"
                      />
                    </div>

                    {/* QUANTITY */}

                    <div>
                      <label
                        htmlFor={`quantity-${index}`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>

                      <input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        {...register(`items.${index}.quantity`)}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
                      />

                      {errors.items?.[index]?.quantity && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.items[index].quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ================================================== */}
                  {/* SUBTOTAL */}
                  {/* ================================================== */}

                  {selectedProduct && (
                    <div className="mt-4 rounded-xl bg-white p-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Price</span>

                        <span>Rs. {selectedProduct.price}</span>
                      </div>

                      <div className="mt-1 flex justify-between text-sm text-gray-600">
                        <span>Quantity</span>

                        <span>{quantity}</span>
                      </div>

                      <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-sm font-semibold text-gray-800">
                        <span>Subtotal</span>

                        <span>Rs. {subtotal}</span>
                      </div>
                    </div>
                  )}

                  {/* ================================================== */}
                  {/* REMOVE PRODUCT */}
                  {/* ================================================== */}

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-3 text-sm font-medium text-red-500 hover:underline"
                    >
                      Remove Product
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* ITEMS ERROR */}

          {errors.items?.message && (
            <p className="mt-2 text-xs text-red-500">{errors.items.message}</p>
          )}

          {productsError && (
            <p className="mt-2 text-xs text-red-500">
              Failed to load products.
            </p>
          )}
        </div>

        {/* ================================================== */}
        {/* SHIPPING ADDRESS */}
        {/* ================================================== */}

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800">
            Shipping Address
          </h3>

          <div className="space-y-3">
            {/* FULL NAME */}

            <div>
              <input
                type="text"
                placeholder="Full name"
                {...register("shippingAddress.fullName")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
              />

              {errors.shippingAddress?.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.shippingAddress.fullName.message}
                </p>
              )}
            </div>

            {/* PHONE */}

            <div>
              <input
                type="text"
                placeholder="Phone"
                {...register("shippingAddress.phone")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
              />

              {errors.shippingAddress?.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.shippingAddress.phone.message}
                </p>
              )}
            </div>

            {/* ADDRESS */}

            <div>
              <input
                type="text"
                placeholder="Address"
                {...register("shippingAddress.address")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
              />

              {errors.shippingAddress?.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.shippingAddress.address.message}
                </p>
              )}
            </div>

            {/* CITY + POSTAL CODE */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <input
                  type="text"
                  placeholder="City"
                  {...register("shippingAddress.city")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
                />

                {errors.shippingAddress?.city && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shippingAddress.city.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Postal code"
                  {...register("shippingAddress.postalCode")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
                />

                {errors.shippingAddress?.postalCode && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.shippingAddress.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* COUNTRY */}

            <div>
              <input
                type="text"
                placeholder="Country"
                {...register("shippingAddress.country")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
              />

              {errors.shippingAddress?.country && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.shippingAddress.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* PAYMENT STATUS */}
        {/* ================================================== */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment Status
          </label>

          <select
            {...register("paymentStatus")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#293354]"
          >
            <option value="pending">Pending</option>

            <option value="paid">Paid</option>
          </select>
        </div>

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={addOrderMutation.isPending}
            className="rounded-xl bg-[#293354] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202943] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addOrderMutation.isPending ? "Creating Order..." : "Create Order"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddOrderModel;
