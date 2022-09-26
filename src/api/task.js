import axiosClient from "./axios-client";

const taskAPI = {
  create: (boardId, params) =>
    axiosClient.post(`boards/${boardId}/tasks`, params),
  updatePostion: (boardId, params) =>
    axiosClient.put(`boards/${boardId}/tasks/update-position`, params),
  delete: (boardId, taskId) =>
    axiosClient.delete(`boards/${boardId}/tasks/${taskId}`),
  update: (boardId, taskId, params) =>
    axiosClient.put(`boards/${boardId}/tasks/${taskId}`, params),
};

export default taskAPI;
