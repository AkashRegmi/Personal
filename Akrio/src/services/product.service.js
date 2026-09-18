import axios from "axios";
import api from "../api/api";
import { getAccessToken } from "../helper/getAccessToken";
const API_URL = import.meta.env.VITE_PRODUCT;

export const addProduct = async (productData) => {
  const formData = new FormData();

  // 1. Append standard text fields
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("category", productData.category);
  formData.append("brand", productData.brand);
  formData.append("stock", productData.stock);
  formData.append("isFeatured", productData.isFeatured);

  // 2. Fix: Handle the tags array cleanly
  // Standard backend configurations expect arrays to be sent per-item
  formData.append("tags", JSON.stringify(productData.tags));

  // 3. Fix: Extract the raw File object from the FileList container
  if (productData.image && productData.image.length > 0) {
    formData.append("image", productData.image[0]); // Grabs the actual binary file
  }
  const token = getAccessToken();
  const response = await axios.post(`${API_URL}api/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//get all the products
export const getAllProducts = async (query, page = 1, limit = 10) => {
  const response = await api.get(`${API_URL}api/products`, {
    params: {
      search: query,
      page,
      limit,
    },
  });

  return response.data;
};
//delete the Product
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}api/products/${productId}`);
  return response.data;
};
//this is for the updation of the data

export const updateProduct = async (id, productData) => {
  const formData = new FormData();

  // 1. Append standard text fields
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);

  // 2. Fix: Handle the tags array cleanly
  // Standard backend configurations expect arrays to be sent per-item
  formData.append("tags", JSON.stringify(productData.tags));

  // 3. Fix: Extract the raw File object from the FileList container
  if (productData.image && productData.image.length > 0) {
    formData.append("image", productData.image[0]); // Grabs the actual binary file
  }
  const response = await axios.put(`${API_URL}/${id}`, formData);

  return response.data;
};

//to get the individual product

export const getSingleProduct = async (productId) => {
  const token = getAccessToken();
  const response = await axios.get(`${API_URL}api/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//for the expoort

export const exportData = (startDate, endDate) => {
  const token = getAccessToken();
  const response = axios.get(`${API_URL}api/products/export`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
    responseType: "blob",
  });
  return response;
};

export const getAllProductsWithoutPagination = async (query) => {
  const response = await api.get(`${API_URL}api/products/all`, {
    params: {
      search: query,
    },
  });

  return response.data;
};

export const getAllProductForCustomer = async (
  search,
  page = 1,
  limit = 10,
) => {
  const response = await axios.get(`${API_URL}api/products`, {
    params: {
      search,
      page,
      limit,
    },
  });
  return response.data;
};
export const getAllProductForCustomerWithoutPagination = async () => {
  const response = await axios.get(`${API_URL}api/products/all`);
  return response.data;
};
export const getProductById = async (productId) => {
  const response = await axios.get(`${API_URL}api/products/${productId}`);
  return response.data;
};
