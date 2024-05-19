import axios from "axios";
import { base_url } from "../../utils/baseUrl";

// Get user data from local storage
const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Check if user data exists in local storage
const config = getUserFromLocalStorage
  ? {
      headers: {
        Authorization: `Bearer ${getUserFromLocalStorage.token}`,
        Accept: "application/json",
      },
    }
  : {};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  console.log(response.data);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getorderbyuser/${id}`,
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
