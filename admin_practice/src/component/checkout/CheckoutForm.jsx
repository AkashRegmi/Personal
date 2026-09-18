import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateOrder } from "../../hooks/useOrders";
const CheckoutForm = ({ items }) => {
  const navigate = useNavigate();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });
  const onSubmit = (formData) => {
    const orderData = {
      items: items.map((item) => ({
        product: item?.product?._id,
        quantity: item?.quantity,
      })),
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      paymentStatus: "pending",
    };
    createOrder(orderData, {
      onSuccess: (data) => {
        toast.success(data?.message || "Order placed SuccessFully");
        navigate("/orders");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to place order");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-gray-200 bg-white p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Shipping Information
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {" "}
              {errors.fullName.message}{" "}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="98XXXXXXXX"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^(97|98)\d{8}$/,
                message: "Enter a valid Nepal phone number",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
          />{" "}
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {" "}
              {errors.phone.message}{" "}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            rows="3"
            placeholder="Enter your delivery address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
          />{" "}
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {" "}
              {errors.address.message}{" "}
            </p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Country
          </label>
          <textarea
            rows="3"
            placeholder="Enter your Country"
            {...register("country", {
              required: "country is required",
              minLength: {
                value: 5,
                message: "Country must be at least 5 characters",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
          />{" "}
          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {" "}
              {errors.country.message}{" "}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              placeholder="Kathmandu"
              {...register("city", { required: "City is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
            />{" "}
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">
                {" "}
                {errors.city.message}{" "}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              placeholder="44600"
              {...register("postalCode", {
                required: "Postal code is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Postal code must be 5 digits",
                },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#293354]"
            />{" "}
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-500">
                {" "}
                {errors.postalCode.message}{" "}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-[#293354] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
