import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteASuggestion,
  getSuggestions,
} from "../features/suggestion/suggestionSlice";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Suggestions = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [suggestionId, setSuggestionId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setSuggestionId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const suggestionsState = useSelector((state) => state.suggestion.suggestions);
  const data1 = [];
  for (let i = 0; i < suggestionsState.length; i++) {
    data1.push({
      key: i + 1,
      name: suggestionsState[i].name,
      email: suggestionsState[i].email,
      mobile: suggestionsState[i].mobile,

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/suggestions/${suggestionsState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(suggestionsState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteSuggestion = (e) => {
    dispatch(deleteASuggestion(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSuggestions());
    }, 100);
  };
  useEffect(() => {
    dispatch(getSuggestions());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Suggestions</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteSuggestion(suggestionId);
        }}
        title="Are you sure you want to delete this suggestion?"
      />
    </div>
  );
};

export default Suggestions;
