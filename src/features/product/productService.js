import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(
    `${base_url}product/${productId}`,
    config
  );

  return response.data;
};

const deleteProductImg = async (productId, publicId) => {
  try {
    const response = await axios.delete(
      `${base_url}product/images/${productId}`,
      { publicId, ...config }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      category: product.productData.category,
      brand: product.productData.brand,
      quantity: product.productData.quantity,
      sold: product.productData.sold,
      images: product.productData.images,
      shades: product.productData.shades,
      tags: product.productData.tags,
    },
    config
  );

  return response.data;
};

const productService = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  deleteProductImg,
  updateProduct,
};

export default productService;
