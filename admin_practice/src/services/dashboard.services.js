import axios from "axios";
import { getAccessToken } from "../helper/getAccessToken";
const APT_URL = import.meta.env.VITE_PRODUCT;
export const dashboardService = async () => {
  const token = getAccessToken();
  const response = await axios.get(`${APT_URL}api/dashboard/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
