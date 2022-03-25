import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";


export default function Card({ image, name, price, shippingCost, path }) {
  return (
    <>
      <div className="flex flex-wrap content-center font-lora">
        <div className=" md:w-96 h-[25rem] p-2 m-2 rounded-lg scale-95 hover:scale-105 shadow-sm shadow-secondary-500">
          <Link to={"/product/" + path} className="no-underline text-black">
            <div className="flex p-3">
              <div>
                <img
                  className="h-5/6 object-contain sm:object-cover max-h-[52rem] hover:shadow-secondary-700"
                  src={image}
                  alt={name}
                />
              </div>
              <div className="pl-3 items-center">
                <h3 className="text-xl font-bold">{name}</h3>
                <br />
                <p className="font-mono font-bold text-2xl">${price}</p>
                <p className="font-light text-md">Shipping ${shippingCost}</p>
                <br />
                <br />
              </div>
            </div>
          </Link>
          <div className="flex justify-around pl-3 items-center">
              <GrFavorite className="text-2xl hover:scale-125 hover:cursor-pointer" />
              <AiOutlineShoppingCart className="text-2xl hover:scale-125 hover:cursor-pointer"/>
          </div>
        </div>
      </div>
    </>
  );
}
