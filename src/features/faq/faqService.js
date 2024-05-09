import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getFaqs = async () => {
  const response = await axios.get(`${base_url}faq/`);

  return response.data;
};

const getFaq = async (id) => {
  const response = await axios.get(`${base_url}faq/${id}`, config);

  return response.data;
};

const addFaq = async (faq) => {
  const response = await axios.post(`${base_url}faq/`, faq, config);

  return response.data;
};

const deleteFaq = async (id) => {
  const response = await axios.delete(`${base_url}faq/${id}`, config);

  return response.data;
};

const updateFaq = async (faq) => {
  const response = await axios.put(
    `${base_url}faq/${faq.id}`,
    {
      question: faq.faqData.question,
      answer: faq.faqData.answer,
    },
    config
  );

  return response.data;
};

const faqService = {
  getFaqs,
  getFaq,
  addFaq,
  deleteFaq,
  updateFaq,
};
export default faqService;
