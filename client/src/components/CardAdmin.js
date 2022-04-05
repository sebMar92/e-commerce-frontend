import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../Redux/Actions/actions';

export default function CardAdmin({ images, title, price, id }) {
  const dispatch = useDispatch();
  function handleDeleteProduct() {
    const result = window.confirm('Are you sure you want to delete this item?');
    if (result) {
      dispatch(deleteProduct(id));
    }
  }
  return (
    <div className="flex flex-row justify-between border-white">
      <div className="flex grow w-1/2 h-24 border-t-4 border-x-4 border-white p-4 bg-secondary-100 hover:bg-primary-200 hover:font-medium">
        <Link to={`/admin/edit/${id}`} className="text-inherit no-underline">
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
        <div
          onClick={() => handleDeleteProduct()}
          className="flex grow w-1/4 h-24 items-center justify-center border-t-4 border-white p-4 bg-secondary-100  hover:font-medium hover:bg-rose-700"
        >
          X
        </div>
      </div>
    </div>
  );
}
