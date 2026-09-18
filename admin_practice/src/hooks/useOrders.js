import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllOrders, getSingleOrder } from "../services/orders.services";
import { createOrder } from "../services/order.service";

export const useOrders = (limit, page, query) => {
  return useQuery({
    queryKey: ["orders", query, page, limit],
    queryFn: () => getAllOrders(limit, page, query),
  });
};
export const useOrderById = (id) => {
  return useQuery({
    queryKey: ["orderById", id],
    queryFn: () => getSingleOrder(id),
    enabled: Boolean(id), //if thje id id undefined he the React Query doesn't make the request. once get the id then it will fetch that
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
