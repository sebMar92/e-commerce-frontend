import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getUserInfo } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function CartModal() {
  const token = window.localStorage.getItem('access');
  const user = useSelector((state) => state.home.user);
  const order = useSelector((state) => state.home.orders);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="group">
        <button className=" rounded-t-full w-10/10 px-2 py-2 group ">
          <AiOutlineShoppingCart className="text-2xl" />
          <ul className="absolute -ml-2 mt-1 rounded-lg  z-50 text-sm">
            <Link to="/user" className="no-underline text-black">
              <li className="rounded-t-md bg-secondary-100 p-1.5 z-10 translate-y-10  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible duration-100 ease-in hover:bg-primary-300 ">
                Profile
              </li>
            </Link>
          </ul>
        </button>
      </div>
    </div>
  );
}
