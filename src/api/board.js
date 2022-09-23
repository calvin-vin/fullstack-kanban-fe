import axiosClient from "./axios-client";

const boardAPI = {
  create: () => axiosClient.post("boards"),
  getAll: () => axiosClient.get("boards"),
  updatePosition: (params) => axiosClient.put("boards", params),
  getOne: (id) => axiosClient.get(`boards/${id}`),
  delete: (id) => axiosClient.delete(`boards/${id}`),
  update: (id, params) => axiosClient.put(`boards/${id}`, params),
  getFavourites: () => axiosClient.get("boards/favourites"),
  updateFavouritesPosition: (params) =>
    axiosClient.put("boards/favourites", params),
};

export default boardAPI;
