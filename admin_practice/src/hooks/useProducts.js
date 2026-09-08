import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct } from "../services/product.service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useProductById = (productId) => {
  return useQuery({
    queryKey: ["productById", productId],
    queryFn: () => getSingleProduct(productId),
  });
};
