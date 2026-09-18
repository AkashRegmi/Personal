import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { RegisterSchema } from "../schemas/auth.schema";
import { register as registerUser } from "../services/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");

      navigate("/login");
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#293354]">Create Account</h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your account to start shopping
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#293354] ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#293354] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-[#293354] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-lg bg-[#293354] px-4 py-3 font-medium text-white transition hover:bg-[#202943] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#293354] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
