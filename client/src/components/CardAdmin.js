import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../Redux/Actions/actions";

export default function CardAdmin({ images, title, price, id }) {
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);
  function handleDeleteProduct() {
    setOn(false);
    dispatch(deleteProduct(id));
    /* const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      dispatch(deleteProduct(id));
    } */
  }
  return (
    <div className="flex flex-row justify-between border-white">
      <div className="flex grow w-1/2 h-24 border-t-4 border-x-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium">
        <Link to={`/product/${id}`} className="text-inherit no-underline">
          <div className=" flex flex-row flex-wrap justify-around">
            <div className=" flex justify-start w-40">
              <img
                className="items-center align-center max-h-20 pb-2"
                src={images}
                alt="product image"
              />
            </div>

            <h5 className="text-lg text-left m-2 flex flex-wrap justify-center">
              {title}
            </h5>
          </div>
        </Link>
      </div>
      <div className="flex flex-row justify-flex-end w-1/3">
        <Link
          to={`/admin/edit/${id}`}
          className="no-underline text-black flex grow w-full h-24 items-center justify-center border-t-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium"
        >
          <div className="">Edit</div>
        </Link>
        <Link
          to={`/admin/discounts?p=${id}`}
          className="no-underline text-black flex grow w-full h-24 items-center justify-center border-t-4 border-x-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium"
        >
          <div className="">Add sale</div>
        </Link>

        <button
          onClick={() => setOn(true)}
          className="flex grow w-1/4 h-24 items-center justify-center border-t-4 border-white p-4 bg-secondary-100  hover:font-medium hover:bg-rose-700"
        >
          X
        </button>
        {on && (
          <div className="absolute mt-10 justify-center items-center font-lora ">
            <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
              <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                <h3>Confirmation</h3>
                <button
                  onClick={() => setOn(false)}
                  className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                >
                  x
                </button>
              </div>
              <br />
              <span className="m-8">Are you sure you want to delete it ?</span>
              <br />
              <br />
              <div className="flex justify-evenly m-3">
                <button
                  onClick={() => handleDeleteProduct()}
                  className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                >
                  Accept
                </button>
                <button
                  onClick={() => setOn(false)}
                  className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
