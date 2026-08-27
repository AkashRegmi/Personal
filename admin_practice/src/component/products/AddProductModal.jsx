
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../schemas/product.schema";
import { addProduct } from "../../services/product.service";
import Modal from "../common/Modal";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddProductModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      tags: [""],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const handleClose = () => {
    reset();
    onClose();
  };
  //Using the react query
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success(data?.message);
      reset();
      onClose();
    },
    onError: (error) => {
      if (error?.response && error?.response?.status === 400) {
        const serverError = error?.response?.data?.message;

        toast.error(serverError || "Invalid product data.");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
  });
  //On subbmitting the dta
  const onSubmit = (productData) => {
    addProductMutation.mutate(productData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Product"
      description="Add a new product to your inventory."
      size="md"
    >
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="p-6"
      >
        {" "}
        <div>
          <label
            htmlFor="product-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>

          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            {...register("name")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>{" "}
        <div>
          <label
            htmlFor="product-price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price of Product
          </label>

          <input
            id="product-price"
            type="number"
            step="0.01"
            placeholder="Enter product price"
            {...register("price")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="product-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="product-description"
            rows="4"
            placeholder="Enter product description"
            {...register("description")}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* Product Image */}
        <div>
          <label
            htmlFor="product-image"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>

          <input
            id="product-image"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            {...register("image")}
            className="block w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-600
      file:mr-4 file:border-0 file:bg-[#293354] file:px-4 file:py-2.5
      file:text-sm file:font-medium file:text-white
      hover:file:bg-[#202943]"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>{" "}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tags
          </label>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Tag ${index + 1}`}
                  {...register(`tags.${index}`)}
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-[#293354] focus:ring-2 focus:ring-[#293354]/10"
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append("")}
              disabled={fields.length >= 10}
              className="text-sm font-medium text-[#293354] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Tag
            </button>
            {errors.tags?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.tags.message}</p>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="mt-7 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#293354] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202943] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {addProductMutation.isPending ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
