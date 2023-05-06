import axios from "axios";
import { getUser } from "../utils";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
instance.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${getUser()?.access_token}`,
    },
  };
});
export default instance;
