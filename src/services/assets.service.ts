import axios from "./axios";

export const getAssets = (query: string) => {
  return axios.get("assets?" + query);
};

export const createAssets = (payload: any) => {
  return axios.post("assets", payload);
};

export const deleteAsset = (id: string) => {
  return axios.delete("assets/" + id);
};

export const getAsset = (id: string) => {
  return axios.get("assets/" + id);
};

export const updateAsset = (id: string, data: any) => {
  return axios.patch("assets/" + id, data);
};

export const downloadAsset = (src: string) => {
  return axios.get(`assets/download?key=${src}`, { responseType: "blob" });
};

export const getPreviousSubmissionResults = (userId: string) => {
  return axios.post("assets/getPreviousSubmissionResults", { userId });
};