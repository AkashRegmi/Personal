import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart } from "../services/cart.services";
import { useAuth } from "./useAuth";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      // Refresh cart after successfully adding a product
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
export const useCart = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isAuthenticated,
  });
};
