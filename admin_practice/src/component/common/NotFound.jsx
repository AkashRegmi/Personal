import { PackageOpen } from "lucide-react";

const NotFound = ({
  title = "Product Not Found",
  description = "There are no products available at the moment.",
}) => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center px-6 text-center ">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        {" "}
        <PackageOpen
          size={32}
          strokeWidth={1.8}
          className="text-gray-400"
        />{" "}
      </div>
      <h3 className="text-xl font-semibold text-gray-800"> {title} </h3>
      <p className="mt-1 max-w-sm text-md text-gray-500"> {description} </p>
    </div>
  );
};

export default NotFound;
