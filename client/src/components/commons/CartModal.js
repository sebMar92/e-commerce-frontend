import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getUserInfo } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartModal() {
  const order = useSelector((state) => state.home.orders)
  const sliced = order.slice(0,2);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrder({status: "inCart"}))
  }, [dispatch])
  
  
  return (
    <div>
        <div className="group">
          <button className=" rounded-t-full w-10/10 px-2 py-2 group ">
            <AiOutlineShoppingCart className='text-2xl mt-1 active:scale-120'/>
            <ul className="absolute z-50 -translate-x-12 mt-1 text-sm">
              {sliced.length > 0 && 
              sliced.map((e) => {
                return (
                <Link to="/wishlist" key={e.id} className="no-underline text-black">
                <li className="hover:rounded-b-md bg-secondary-100 p-1.5 z-10 translate-y-10 invisible group-hover:-translate-x-10 group-hover:translate-y-0 group-hover:visible duration-100 ease-in hover:bg-primary-300 ">
                  {e.title}
                  <img src={e.images[0] && e.images[0].url} alt={e.id}/>
                </li>
              </Link>
                )
              })}
              <Link to="/cart" className='rounded-b-md bg-secondary-100 invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible duration-100 ease-in hover:bg-primary-300'>View full cart</Link>
            </ul>
          </button>
        </div>
    </div>
  );
}
