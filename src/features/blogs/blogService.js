import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, config);
  console.log(response.data);
  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );

  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);

  return response.data;
};

const deleteBlogImg = async (blogId, publicId) => {
  try {
    const response = await axios.delete(`${base_url}blog/images/${blogId}`, {
      data: { publicId },
      ...config,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const blogService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  deleteBlogImg,
};

export default blogService;
