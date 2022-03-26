import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo,getOrder, getOrderFavs } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";


export default function FavsModal() {
  const favs = useSelector((state) => state.home.favs)
  const ordersFav = favs.slice(0,2);
  const dispatch = useDispatch();
  console.log(ordersFav)

  useEffect(() => {
    dispatch(getOrderFavs({status: "inWishList"}))
  }, [dispatch])
  
  
  return (
    <div>
        <div className="group">
          <button className=" rounded-t-full w-10/10 px-2 py-2 group ">
            <GrFavorite className='text-2xl mt-1 active:scale-120'/>
            <ul className="absolute z-50 -translate-x-32 mt-1 text-sm">
              {ordersFav.length > 0 && 
              ordersFav.map((e) => {
                return (
                <Link to="/wishlist" key={e.id} className="no-underline text-black">
                <li className="rounded-b-md bg-secondary-100 p-1.5 z-10 translate-y-10 invisible group-focus:translate-x-0 group-focus:translate-y-0 group-focus:visible duration-100 ease-in focus:bg-primary-300 ">
                  {e.title}
                  <img src={e.images[0] && e.images[0].url} alt={e.id}/>
                </li>
              </Link>
                )
              })}
              <Link to="/wishlist" className='rounded-b-md bg-secondary-100 invisible group-focus:translate-x-0 group-focus:translate-y-0 group-focus:visible duration-100 ease-in focus:bg-primary-300'>View full wishlist</Link>
            </ul>
          </button>
        </div>
    </div>
  );
}
