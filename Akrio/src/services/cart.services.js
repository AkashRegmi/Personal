import axios from "axios";
const API_URL = import.meta.env.VITE_PRODUCT;
export const addToCart = async ({ productId, quantity }) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${API_URL}api/cart/items`,
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getCart = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.get(`${API_URL}api/cart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
