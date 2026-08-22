import axios from "axios";

const API_URL = import.meta.env.VITE_PRODUCTION_URL;

export const login = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, {
    username: loginData.username,
    password: loginData.password,
  });

  console.log(response.data);

  return response.data;
};