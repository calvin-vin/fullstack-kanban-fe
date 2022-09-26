import axiosClient from "./axios-client";

const sectionAPI = {
  create: (boardId) => axiosClient.post(`boards/${boardId}/sections`),
  update: (boardId, sectionId, params) =>
    axiosClient.put(`boards/${boardId}/sections/${sectionId}`, params),
  delete: (boardId, sectionId) =>
    axiosClient.delete(`boards/${boardId}/sections/${sectionId}`),
};

export default sectionAPI;
