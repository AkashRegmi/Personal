import axios from "axios";

const API_URL = import.meta.env.VITE_PRODUCT;

export const login = async (loginData) => {
  const response = await axios.post(`${API_URL}api/auth/login`, {
    email: loginData.email,
    password: loginData.password,
  });
  return response.data;
};
export const register = async (registerData) => {
  const response = await axios.post(
    `${API_URL}api/auth/register`,
    registerData,
  );

  return response.data;
};
