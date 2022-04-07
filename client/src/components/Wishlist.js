import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardWishlist from './CardWishlist';
import { getOrder, getProducts } from '../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import wishlist from "./utils/empty-wishlist.png"
import { ToastContainer, toast } from 'react-toastify';

export default function Wishlist({}) {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.home.inWishList);
  const wishListOrder = useSelector((state) => state.home.resPutOrder);
  const deleted = useSelector((state) => state.home.deleted)
  const globalSales = useSelector((state) => state.home.globalSales)

  useEffect(() => {
    dispatch(getOrder({ status: 'inWishList' }));
    dispatch(getProducts())
  }, [wishListOrder, deleted]);

  
  return (
    <>
      <ToastContainer/>
      <NavBar />
      <div className="h-screen">
        {product &&
          product.length > 0 ? (
          product.map((prod) => {
            return (
              <div>
                <CardWishlist
                  id={prod.id}
                  idOrder={prod.orders && prod.orders[0].id}
                  title={prod.title}
                  price={prod.price}
                  images={prod.images && prod.images[0].url}
                  shippingCost={prod.shippingCost}
                  stock={prod.stock}
                  key={prod.id}
                  categorySales={prod.sales.categorySales}
                  productSales={prod.sales.productSales}
                  globalSales={globalSales}
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
