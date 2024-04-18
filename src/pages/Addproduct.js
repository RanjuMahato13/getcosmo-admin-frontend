import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getShades } from "../features/shade/shadeSlice";
import { Select } from "antd";
//import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import {
  delImg,
  uploadImg,
  addImage,
  resetState as resetImageState,
} from "../features/upload/uploadSlice";
//import Multiselect from "react-widgets/Multiselect";
import {
  createProducts,
  resetState,
  updateAProduct,
  getAProduct,
  deleteProdImg,
} from "../features/product/productSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  shades: Yup.array()
    .min(1, "Pick at least one shades")
    .required("Shade is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProdId = location.pathname.split("/")[3];
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const shadeState = useSelector((state) => state.shade.shades);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const [totalImages, setTotalImages] = useState([]);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    prodName,
    prodDesc,
    prodPrice,
    prodBrand,
    prodCategory,
    prodTags,
    prodShades,
    prodQuantity,
    prodImages,
  } = newProduct;
  const shadeopt = shadeState.map((shade) => ({
    label: shade.title,
    value: shade._id,
  }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: prodName || "",
      description: prodDesc || "",
      price: prodPrice || "",
      brand: prodBrand || "",
      category: prodCategory || "",
      tags: prodTags || "",
      shades: [],
      quantity: prodQuantity || "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProdId !== undefined) {
        const data = { id: getProdId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
        dispatch(resetImageState());
      } else {
        dispatch(createProducts(values));
        setTimeout(() => {
          formik.resetForm();
          dispatch(resetState());
          dispatch(resetImageState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    if (getProdId !== undefined) {
      dispatch(getAProduct(getProdId));
    } else {
      dispatch(resetState());
    }
  }, [getProdId]);

  useEffect(() => {
    if (prodImages) {
      const updatedBlogImages = prodImages.map((image) => ({
        ...image,
        existing: true,
      }));
      setTotalImages([...updatedBlogImages, ...imgState]);
    } else {
      setTotalImages(imgState);
    }
  }, [prodImages, imgState]);

  useEffect(() => {
    formik.setFieldValue("images", totalImages);
  }, [totalImages]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getShades());
  }, []);

  useEffect(() => {
    formik.setFieldValue("shades", prodShades);
  }, [prodShades]);

  useEffect(() => {
    formik.setFieldValue("images", imgState);
  }, [imgState]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Added Successfullly!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, updatedProduct, isError, isLoading]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getProdId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              // value={desc}
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="disabled">Select Tag</option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="offer">Offer</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select shades"
            value={formik.values.shades}
            onChange={(selectedShades) =>
              formik.setFieldValue("shades", selectedShades)
            }
            options={shadeopt}
          />
          <div className="error">
            {formik.touched.shades && formik.errors.shades}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {formik.values.images?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={
                      i.existing
                        ? () => {
                            dispatch(deleteProdImg(getProdId, i.public_id));
                            dispatch(delImg(i.public_id));
                          }
                        : () => dispatch(delImg(i.public_id))
                    }
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProdId !== undefined ? "Update" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
