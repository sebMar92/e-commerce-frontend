import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import CardCart from "./CardCart";
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { MdRestaurantMenu } from "react-icons/md";
import { getOrder } from "../Redux/Actions/actions";

export default function Cart({}) {
const dispatch = useDispatch();
let {idProduct}= useParams()
const product = useSelector((state) => state.home.cart)
console.log(product)
useEffect(() => {
  getOrder(idProduct);
}, [dispatch, idProduct]);

function adjuntarCart(cart){
  cart.map(e=> {
  return (
    <div>
     <CardCart 
     key={e.id}
     name={e.name}
     price={e.price}
     shippingCost={e.shippingCost}
     stock={e.stock}
     /> 
    </div>
  )
})} 


  return (
    <div>
      <NavBar />

      <h1>This is Cart</h1>
     
     {product.length > 0 ? adjuntarCart() : <div> <h2 className="flex justify-center" >no products </h2></div>} 
      {/*  total envio  */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
          <div className="flex justify-end mx-8 my-2">
            <h5 ClassName="text-xs text-gray-900">Shipping Cost $2.000 {}</h5>
          </div>
          <div className="flex justify-end mx-8 my-2">
            <h1 ClassName="text-1xl  text-gray-900">Total $ 10.000{}</h1>
          </div>
          <div className="mx-5">
            <h1>Shipment</h1>
            <span>Direction: {}</span>
            <br />
            <button className="bg-[#3b82f6] text-white p-1 m-2 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition">
              Change direction
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="bg-[#3b82f6] text-white p-1 my-8 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition  w-24">
        Continue
        </button>
      </div>
      <Footer />
    </div>
  );
}
