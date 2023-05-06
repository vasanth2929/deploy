import axios from "./axios";
import { getUser } from "../utils";

export const saveUserActivity = (data: {
  assetId: string;
  stat_type: "view" | "download";
}) => {
  if (getUser()?.access_token) return axios.put("stat/for-user", data);
  else return axios.put("stat/for-guest", data);
};

export const getMyStatistics = () => {
  return axios.get("stat");
};

export const getAllStatistics = () => {
  return axios.get("stat/all");
};