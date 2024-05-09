import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFaq,
  addFaq,
  resetState,
  getFaq,
} from "../features/faq/faqSlice";

const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});
function AddFaq() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getFaqId = location.pathname.split("/")[3];
  const newFaq = useSelector((state) => state.faq);
  const {
    isSuccess,
    isError,
    isLoading,
    question,
    answer,
    updatedFaq,
    createdFaq,
  } = newFaq;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question,
      answer,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getFaqId !== undefined) {
        const data = { id: getFaqId, faqData: values };
        dispatch(updateFaq(data));
        dispatch(resetState());
        navigate("/admin/faqs");
      } else {
        dispatch(addFaq(values));
        formik.resetForm();
        dispatch(resetState());
        navigate("/admin/faqs");
      }
    },
  });

  useEffect(() => {
    dispatch(resetState());
    if (getFaqId !== undefined) {
      dispatch(getFaq(getFaqId));
    } else {
      dispatch(resetState());
    }
  }, [getFaqId]);

  useEffect(() => {
    if (isSuccess && createdFaq) {
      toast.success("Faq Added Successfullly!");
    }
    if (isSuccess && updatedFaq) {
      toast.success("Faq Added Successfullly!");
      navigate("/admin/faqs");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, updatedFaq, isError, isLoading]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getFaqId !== undefined ? "Edit" : "Add"} FAQ
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Question"
            name="question"
            onChng={formik.handleChange("question")}
            onBlr={formik.handleBlur("question")}
            val={formik.values.question}
          />
          <div className="error">
            {formik.touched.question && formik.errors.question}
          </div>
          <CustomInput
            type="text"
            label="Enter Answer"
            name="answer"
            onChng={formik.handleChange("answer")}
            onBlr={formik.handleBlur("answer")}
            val={formik.values.answer}
          />
          <div className="error">
            {formik.touched.answer && formik.errors.answer}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getFaqId !== undefined ? "Update" : "Add"} FAQ
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFaq;
