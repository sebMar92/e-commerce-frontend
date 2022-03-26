import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import CardCart from "./CardCart";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdRestaurantMenu } from "react-icons/md";
import { getOrder } from "../Redux/Actions/actions";

export default function Cart({}) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.home.inCart);
  const [total, setTotal]=useState(0)

  useEffect(() => {
    dispatch(getOrder({ status: "inCart" }));
  }, []);
 
  return (
    <div>
      <NavBar />

      <h1>This is Cart</h1>

      {product.length > 0 &&
        product.map((prod) => {
       
          return (
            <div>
 
              <CardCart 
               key={prod.id}
               title={prod.title}
                price={prod.price}
                images={prod.images[0].url}
                shippingCost={prod.shippingCost}
                stock={prod.stock}
                
              />
            </div>
          );
        })}
      {/*  total envio  */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
          <div className="flex justify-end mx-8 my-2">
            <h5 className="text-xs text-gray-900">Shipping Cost ${}</h5>
          </div>
          <div className="flex justify-end mx-8 my-2">
           
                <div></div>
            
            
            <h1 className="text-1xl  text-gray-900">Total $ 10.000{}</h1>
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
