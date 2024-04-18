import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
const getShades = async () => {
  const response = await axios.get(`${base_url}shade/`);

  return response.data;
};
const createShade = async (shade) => {
  const response = await axios.post(`${base_url}shade/`, shade, config);

  return response.data;
};
const updateShade = async (shade) => {
  const response = await axios.put(
    `${base_url}shade/${shade.id}`,
    { title: shade.shadeData.title },
    config
  );

  return response.data;
};
const getShade = async (id) => {
  const response = await axios.get(`${base_url}shade/${id}`, config);

  return response.data;
};
const deleteShade = async (id) => {
  const response = await axios.delete(`${base_url}shade/${id}`, config);

  return response.data;
};
const shadeService = {
  getShades,
  createShade,
  updateShade,
  getShade,
  deleteShade,
};

export default shadeService;
