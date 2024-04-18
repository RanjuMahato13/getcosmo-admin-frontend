import React, { useEffect, useState,  } from "react"
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { deleteAShade, getShades } from "../features/shade/shadeSlice";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
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
      title: "Action",
      dataIndex: "action",
    },
  ];
  

  const Shadelist = () => {
  const [open, setOpen] = useState(false);
    const [shadeId, setshadeId] = useState("");
    const showModal = (e) => {
      setOpen(true);
      setshadeId(e);
    };
    
    const hideModal = () => {
      setOpen(false);
  };
  const data1= [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShades());
  }, []);
  const shadeState = useSelector((state) => state.shade.shades);
  for (let i = 0; i < shadeState.length; i++) {
    data1.push({
      key: i + 1,
      name: shadeState[i].title,
      action: (
        <>
        <Link to={`/admin/shade/${shadeState[i]._id}`} className="fs-3 text-danger">
           <BiEdit />
        </Link>
        <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={ () => showModal(shadeState[i]._id)}>
           <AiFillDelete />
        </button>
        </>
      ),
    });
  }
  const deleteShade = (e) => {
  dispatch(deleteAShade(e));
    setOpen(false);
    //console.log(e);
    setTimeout(() => {
      dispatch(getShades());
    }, 100);
  }; 
  return (
    <div>
    <h3 className="mb-4 title">Shades</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
      hideModal={hideModal}
      open ={open}
      performAction = {() => {deleteShade(shadeId)}}
      title="Are you sure want to delete this shade?" 
    />
    </div>
  );
};

export default Shadelist;