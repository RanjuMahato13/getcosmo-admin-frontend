import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getASuggestion } from "../features/suggestion/suggestionSlice";
import { BiArrowBack } from "react-icons/bi";

const ViewSuggestion = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSuggestionId = location.pathname.split("/")[3];
  const suggestionState = useSelector((state) => state.suggestion);
  const { name, mobile, email, suggestion } = suggestionState.suggestion;
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getASuggestion(getSuggestionId));
  }, [getSuggestionId]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Suggestion</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" />
          Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${mobile}`}>{mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Suggestion:</h6>
          <p className="mb-0">{suggestion}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewSuggestion;
