import axios from "axios";

const API_URL = import.meta.env.VITE_PRODUCT;
export const createOrder = async (orderData) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post(`${API_URL}api/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
 
  return response.data;
};
