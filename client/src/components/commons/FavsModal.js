import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo,getOrder, getOrderFavs } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";


export default function FavsModal() {
  const favs = useSelector((state) => state.home.favs)
  const render = useSelector((state) => state.home.postOrders)
  const ordersFav = favs;
  const dispatch = useDispatch();
  console.log(ordersFav)

  useEffect(() => {
    dispatch(getOrderFavs({status: "inWishList"}))
  }, [render])
  
  
  return (
    <div>
        <div className="group">
          <button className=" rounded-t-full px-2 py-2 group ">
            <GrFavorite className='text-2xl mt-1 hover:scale-120'/>
            <ul className={`absolute z-50 -translate-x-52 mt-1 text-sm invisible group-hover:visible p-4 ${ordersFav.length > 0 ? "bg-white" : ""} rounded-xl`}>
            <p className={`text-xl mb-2 font-bold ${ordersFav.length > 0 ? "" : "text-transparent"}`}>Wishlist</p>
              {ordersFav.length > 0 &&
              ordersFav.map((e,i) => {
                if(i < 2){
                return (
                  <>
                <Link to="/wishlist" key={e.id} className="no-underline text-black">
                <li className="grid grid-cols-2 gap-2 bg-white w-52 mb-2">
                  {e.title}
                  <img src={e.images[0] && e.images[0].url} alt={e.id}/>
                </li>
              </Link>
                  <div className='flex justify-evenly bg-slate-100'>
                    <button className='text-red-600 font-bold px-2 my-1 rounded-lg active:translate-y-1'>Eliminar</button>
                    <Link to="/cart" className='no-underline text-black bg-primary-700 rounded-sm px-2 py-2 my-1 active:translate-y-1 font-medium'>Go to buy</Link>
                </div>
                </>
                )}
              })}
            {ordersFav.length > 0
            ?
              <Link to="/wishlist" className='flex justify-center mt-1 underline decoration-primary-700 hover:scale-105 text-black invisible group-hover:visible w-12/12'>View full wishlist</Link>
            : null}
            </ul>
          </button>
        </div>
    </div>
  );
}
