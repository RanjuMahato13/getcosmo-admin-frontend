import { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getFaqs, deleteFaq } from "../features/faq/faqSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Question",
    dataIndex: "question",
    sorter: (a, b) => a.question.length - b.question.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

export default function ListFaqs() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const faqsState = useSelector((state) => state.faq.faqs);
  const [faqId, setFaqId] = useState("");
  const hanldeDeleteFaq = (e) => {
    dispatch(deleteFaq(e));
    setShowModal(false);
    setTimeout(() => {
      dispatch(getFaqs());
    }, 100);
  };
  const data1 = [];
  for (let i = 0; i < faqsState.length; i++) {
    data1.push({
      key: i,
      question: faqsState[i].question,
      action: (
        <>
          <Link
            to={`/admin/faqs/${faqsState[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              setFaqId(faqsState[i]._id);
              setShowModal(true);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  return (
    <div>
      <h3 className="mb-4 title">Faqs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={() => setShowModal(false)}
        open={showModal}
        performAction={() => {
          hanldeDeleteFaq(faqId);
        }}
        title="Are you sure want to delete this faq?"
      />
    </div>
  );
}
