import { useMutation, useQuery } from "@tanstack/react-query";
import {
  exportData,
  getAllProductForCustomer,
  getAllProductForCustomerWithoutPagination,
  getAllProducts,
  getAllProductsWithoutPagination,
  getProductById,
  getSingleProduct,
} from "../services/product.service";

export const useProducts = (search, page, limit = 10) => {
  return useQuery({
    queryKey: ["products", search, page, limit],
    queryFn: () => getAllProducts(search, page, limit),
  });
};

export const useProductById = (productId) => {
  return useQuery({
    queryKey: ["productById", productId],
    queryFn: () => getSingleProduct(productId),
  });
};

export const useExportProducts = () => {
  return useMutation({
    mutationFn: ({ startDate, endDate }) => exportData(startDate, endDate),
  });
};
export const useProductsWithOutPagination = (search) => {
  return useQuery({
    queryKey: ["allproducts", search],
    queryFn: () => getAllProductsWithoutPagination(search),
  });
};
export const useCustomerProducts = (search, page, limit) => {
  return useQuery({
    queryKey: ["customer-products", search, page, limit],
    queryFn: () => getAllProductForCustomer(search, page, limit),
  });
};
export const useProductsCustomerWithOutPagination = () => {
  return useQuery({
    queryKey: ["productswiyhoutPaginationx"],
    queryFn: getAllProductForCustomerWithoutPagination,
  });
};

export const useGetproductById = (productId) => {
  return useQuery({
    queryKey: ["getProductById", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    // t means React Query won't call the API until we actually have a product ID.
  });
};
