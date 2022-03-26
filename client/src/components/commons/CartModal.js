import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getUserInfo } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartModal() {
  const order = useSelector((state) => state.home.orders)
  const sliced = order;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrder({status: "inCart"}))
  }, [dispatch])
  
/*   useEffect(() => {
    dispatch(getUserInfo(token));
    if (token && token.length > 4) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }, [token]); */

  return (
    <div>
        <div className="group">
          <button className="px-2 py-2 group">
            <AiOutlineShoppingCart className='text-2xl mt-1 active:scale-120'/>
            <ul className="absolute z-50 -translate-x-52 mt-1 text-sm invisible group-hover:visible p-4 bg-white rounded-xl">
              {sliced.length > 0 && 
              sliced.map((e) => {
                return (
                  <>
                <Link to="/cart" key={e.id} className="no-underline text-black">
                <li className="grid grid-cols-2 gap-2 bg-white w-52 mt-2">
                  <p>{e.title}</p>
                  <img className='h-20 object-cover' src={e.images[0] && e.images[0].url} alt={e.id}/>
                </li>
              </Link>
                  <div className='flex justify-evenly bg-slate-100'>
                    <button className='text-red-600 font-bold px-2 my-1 rounded-lg active:translate-y-1'>Eliminar</button>
                    <Link to="/cart" className='no-underline text-black bg-primary-700 rounded-lg px-2 py-1 my-1 active:translate-y-1 font-bold'>Go to buy</Link>
                  </div>
              </>
                )
              })}
              {sliced.length > 0 ?
              <Link to="/cart" className='flex justify-center mt-1 underline decoration-primary-700 hover:scale-105 text-black invisible group-hover:visible w-12/12'>View full cart</Link>
              : null }
            </ul>
          </button>
        </div>
    </div>
  );
}
