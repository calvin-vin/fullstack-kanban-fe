import axiosClient from "./axios-client";

const authAPI = {
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: (params) => axiosClient.post("auth/verify-token", params),
};

export default authAPI;
