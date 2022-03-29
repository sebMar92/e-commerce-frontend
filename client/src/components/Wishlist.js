import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardWishlist from './CardWishlist';
import { getOrder } from '../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import wishlist from "./utils/empty-wishlist.png"

export default function Wishlist({}) {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.home.inWishList);
  const wishListOrder = useSelector((state) => state.home.resPutOrder);

  useEffect(() => {
    dispatch(getOrder({ status: 'inWishList' }));
  }, [wishListOrder]);

  return (
    <>
      <NavBar />
      <div className="wishlist">
        {product &&
          product.length > 0 ? (
          product.map((prod) => {
            return (
              <div>
                <CardWishlist
                  id={prod.id}
                  idOrder={prod.orders[0].id}
                  title={prod.title}
                  price={prod.price}
                  images={prod.images[0].url}
                  shippingCost={prod.shippingCost}
                  stock={prod.stock}
                  key={prod.id}
                />
              </div>
            );
          })) :( <div className="flex justify-center m-10 ">
            <div className="justify-center">
          <h1 className="font-serif text-center">This Wishlist is empty</h1><br/>
          <span className="flex justify-center">
          <img className=" animate-pulse   w-4/6"src={wishlist}/>
          </span>
          </div>
        </div>) }
      </div>
      <Footer />
    </>
  );
}
