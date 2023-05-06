import { User } from "../types/user.type";
import axios from "./axios";

export const getUserInfoAndAssets = (query: string) => {
  return axios.get("user/assets?slug=" + query);
};
export const getUserDetail = () => {
  return axios.get("user/me");
};

export const setUserDetail = (payload: Partial<User>) => {
  return axios.put("user/me/update", payload);
};

export const changePassword = (payload) => {
  return axios.put("user/change-password", payload);
};

export const login = (payload: any) => {
  return axios.post("user/login", payload);
};

export const loginByGoogle = (payload: { token: string }) => {
  return axios.post("user/login/google", payload);
};

export const register = (payload: any) => {
  return axios.post("user/register", payload);
};

export const getUsers = () => {
  return axios.get("user");
};

export const updateStatus = (id: string, status: string) => {
  return axios.put("user/update/status", { id, status });
};

export const getAssetSavedStatus = (id: string) => {
  return axios.get(`user/getAssetSavedStatus?assetId=${id}`);
};

export const saveAsset = (assetId: string) => {
  return axios.put(`user/saveAsset`, { assetId });
};

export const removeAsset = (assetId: string) => {
  return axios.put(`user/removeAsset`, { assetId });
};

export const getSavedCollections = () => {
  return axios.get(`user/getSavedCollections`);
};