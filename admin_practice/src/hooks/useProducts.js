import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/product.service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};
