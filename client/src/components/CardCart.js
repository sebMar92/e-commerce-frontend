import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteOrder, getOrder, changeOrderAmount } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import ButtonBuyChange from "../components/commons/ButtonBuyChange";

import Product from "./utils/Notebook-Odyssey-2.jpg";

export default function CardCart({
  id,
  idOrder,
  images,
  title,
  price,
  shippingCost,
  stock,
  amount
}) {

  const resAmountOrder = useSelector((state) => state.home.resAmountOrder)

  useEffect(() => {
    dispatch(getOrder({ status: "inCart" }));
  }, [resAmountOrder]);


  const dispatch = useDispatch();
  /* const [count, setCount] = useState(amount); */
  const [value, setValue] = useState(price * amount);

  const deleteCart = (e) => dispatch(deleteOrder(idOrder, id, "inCart"))

  function handleDecrease() {

    dispatch(changeOrderAmount({
      id: idOrder,
      amount: - 1
    }))
  }

  function handleIncrement() {

    dispatch(changeOrderAmount({
      id: idOrder,
      amount: + 1
    }))
  }

  return (
    <div className=" flex flex-wrap  justify-center">
      <div className=" bg-secondary-100  w-9/12 m-5 rounded-md ">
        <div className=" flex justify-end">

          <button onClick={((e) => deleteCart(e))} className=" text-rigth text-black  m-2 px-1  rounded-md font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] hover:text-[#fff]  shadow-lg shadow-primary-200/80">
            x
          </button>

        </div>
        <div className=" flex flex-wrap justify-between  rounded-lg w-12/12 h-auto">
          <div className="flex">
            <Link
              to={"/product/" + id}
              className="text-inherit no-underline"
            >
              <div className=" flex flex-wrap justify-center w-40">
                <img
                  className=" items-center max-h-28 p-2  m-3 rounded-t-lg"
                  src={images}
                  alt="product image"
                />
              </div>
            </Link>
            <div className="w-3/4">
              <Link
                to={"/product/" + id}
                className="text-inherit no-underline"
              >
                <h6 className="text-lg text-lefth font-thin m-2 ">{title}</h6>
              </Link>
              {shippingCost == 0 ? (
                <div>
                  <p className="text-xs text-blue-900 m-3">Free shipping</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-blue-900 m-3">ShippingCost: ${shippingCost}</p>
                  <ButtonBuyChange id={idOrder} status={"finished"} />
                </div>
              )}
            </div>
          </div>
          <div className=" w-48">
            <p className="text-1xl my-2 text-center font-bold text-gray-900 ">
              $ {(amount * price).toFixed(2)}
            </p>
            <div className="flex justify-between">
              <button 
                className=" bg-[#3b82f6] text-white  px-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1"
                onClick={() => handleDecrease()}
                
              >
                -
              </button>
              <span className="mx-2">{amount}</span>
              <button
                className="bg-[#3b82f6] text-white px-2 rounded-md text-xl font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1"
                onClick={() => handleIncrement()}
              >
                +
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 ">Stock: {stock}</p>

          </div>
        </div>
      </div>
    </div>
  )
}


