import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getSuggestions = async () => {
  const response = await axios.get(`${base_url}suggestion/`, config);

  return response.data;
};

const getSuggestion = async (id) => {
  const response = await axios.get(`${base_url}suggestion/${id}`, config);
  return response.data;
};
const deleteSuggestion = async (id) => {
  const response = await axios.delete(`${base_url}suggestion/${id}`, config);

  return response.data;
};

const suggestionService = {
  getSuggestions,
  getSuggestion,
  deleteSuggestion,
};

export default suggestionService;
