import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createShade, getAShade, resetState, updateAShade,} from "../features/shade/shadeSlice";
let schema = Yup.object().shape({
  title: Yup.string().required("Shade is Required"),
});

const Addshades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getShadeId = location.pathname.split("/")[3];
  const newShade = useSelector((state) => state.shade);
  const { isSuccess, isError, isLoading, createdShade, updatedShade, shadeName, } = newShade;
  useEffect(() => {
    if(getShadeId !== undefined){
      dispatch(getAShade(getShadeId));
    } else{
      dispatch(resetState());
    }
  }, [getShadeId]);

  useEffect(() => {
    if (isSuccess && createdShade) {
      toast.success("Shade Added Successfullly!");
    }
    if(isSuccess && updatedShade){
      toast.success("Shade updated Successfullly!");
      navigate("/admin/list-shade");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdShade]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: shadeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getShadeId !== undefined){
        const data = { id: getShadeId, shadeData: values};
        dispatch(updateAShade(data));
        dispatch(resetState());
      } else {
        dispatch(createShade(values));
      formik.resetForm();
      setTimeout(() => {
      dispatch(resetState());
      }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getShadeId !==  undefined? "Edit" : "Add"} Shade</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="shade"
            label="Enter Product Shade"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="shade"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
          {getShadeId !==  undefined? "Edit" : "Add"} Shade
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addshades;
