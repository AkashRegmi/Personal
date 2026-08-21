import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LoginSchema } from "../schemas/auth.schema";

const LoginPage = () => {
  const navigate = useNavigate();
  //using the react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //this s for thr zod resolver
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginMutation = useMutation({
    mutationFn: login,
    //this id for the successful event
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          username: data.username,
        }),
      );
      const message = `Welcome back, ${data.firstName}!`;
      toast.success(message || "Welcome to the App");

      navigate("/");
    },
    //this isi for the error encountered
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Invalid username or password";
      toast.error(message);
    },
  });
  const onSubmit = (data) => loginMutation.mutate(data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className=" w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mb-8 text-gray-500">Login to your Student Hub account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              {...register("username")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
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
              placeholder="Enter password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {" "}
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
