// import axios from "axios";
// import { config } from "../../utils/axiosconfig";
// import { base_url } from "../../utils/base_url";

// const uploadImg = async (data) => {
//   const response = await axios.post(`${base_url}upload/`, data, config);
//   console.log(response.data);
//   return response.data;
// };
// const deleteImg = async (id) => {
//   const response = await axios.delete(
//     `${base_url}upload/delete-img/${id}`,
//     config
//   );
//   return response.data;
// };

// const uploadService = {
//   uploadImg,
//   deleteImg,
// };

// export default uploadService;

import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );
  return { ...response.data, public_id: id };
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
