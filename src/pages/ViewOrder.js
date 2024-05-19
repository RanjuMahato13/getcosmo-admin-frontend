import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Shade",
    dataIndex: "shade",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser);
  const data1 = [];
  // for (let i = 0; i < orderState?.orderItems.length; i++) {
  //   data1.push({
  //     key: i + 1,
  //     name: orderState?.[i].orderItems.product?.title,
  //     // product: orderState?.[i].product,
  //     brand: orderState?.[i].orderItems.product.brand,
  //     count: orderState?.[i].count,
  //     amount: orderState?.[i].product?.price,
  //     shade: orderState?.[i].product?.shades,
  //     date: orderState?.[i].product?.createdAt,
  //     action: (
  //       <>
  //         <Link to="/" className=" fs-3 text-danger">
  //           <BiEdit />
  //         </Link>
  //         <Link className="ms-3 fs-3 text-danger" to="/">
  //           <AiFillDelete />
  //         </Link>
  //       </>
  //     ),
  //   });
  // }
  orderState?.orderItems.map((item, idx) => {
    data1.push({
      key: idx + 1,
      name: item.product.title,
      brand: item.product.brand,
      count: item.quantity,
      shade: item.shade.title,
      amount: `Rs. ${item.quantity * item.price}`,
      date: new Date(orderState.createdAt).toDateString(),
    });
  });
  // })
  return (
    <div>
      <h3 className="mb-4 title"> View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
