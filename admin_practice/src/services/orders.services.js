import axios from "axios";
import { getAccessToken } from "../helper/getAccessToken";

const API_URL = import.meta.env.VITE_PRODUCT;
export const getAllOrders = async (limit = 10, page = 1, query) => {
  const token = getAccessToken();
  const response = await axios.get(`${API_URL}api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: query,
      page,
      limit,
    },
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  const token = getAccessToken();
  const response = await axios.delete(`${API_URL}api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
  return response.data;
};
export const addOrder = async (orderData) => {
  const token = getAccessToken();

  const response = await axios.post(`${API_URL}api/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSingleOrder = async (id) => {
  const token = getAccessToken();
  const response = await axios.get(`${API_URL}api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
