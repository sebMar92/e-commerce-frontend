import React, { useState } from "react";
import Product from "./utils/Notebook-Odyssey-2.jpg";
import { Link } from "react-router-dom";
 
export default function CardWishlist({ image, name, price, shippingCost, description }) {
 
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
        <div className="flex flex-row-reverse">
          <button className=" text-black items-center  m-2 px-1 rounded-md font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] hover:text-[#fff]  shadow-lg shadow-primary-200/80">
            x
          </button>
        </div>
        <div>
          <div className=" flex flex-wrap justify-between   rounded-lg w-11/12 h-auto">
              <Link to={"/product/:idProduct"} className="text-inherit no-underline">
            <div className=" flex flex-wrap">
              <img
                className="h-24 m-3 rounded-t-lg"
                src={Product} /* src={image} */
                alt="product image"
              />

              <div>
                <h5 className="text-2xl">Laptop{name}</h5>
                <div>
                
               <p>description{description}</p>

               <p className="text-xs text-blue-900 m-3">Free shipping{shippingCost}</p>
                </div>
              </div>
            </div>
            </Link>
            <div>
              <div>
                <br />
                <div>
                <button className="bg-[#3b82f6] text-white p-1 rounded-md text-xs font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1">
                    Buy now
                  </button>
                 
                  <span className="text-1xl font-bold text-gray-900 mx-5">
                    $10.000{price}
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
