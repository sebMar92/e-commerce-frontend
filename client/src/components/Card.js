import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";
import Product from "./utils/R.png";


export default function Card({ image, name, price, shippingCost,path }) {
  return (
    <>
    <Link to={"/product/"+ path} className="no-underline text-black">
    <div className="flex flex-wrap content-center font-lora">
      <div className=" md:w-96 h-[25rem] p-2 m-2 rounded-lg scale-95 hover:scale-105 shadow-sm shadow-secondary-500">
        <div className="flex p-3">
          <div>
            <img className="h-5/6 object-contain sm:object-cover max-h-[52rem] hover:shadow-secondary-700"
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
            <div className="flex justify-around">
              <Link to={"/wishlist/:idUser"} style={{ textDecoration: "inherit" }}>
                <img className="p-1 hover:p-0" src={Star} />
              </Link>
              <Link to={"/cart/:idUser"} style={{ textDecoration: "inherit" }}>
                <img className="p-1 hover:p-0" src={Cart} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
}
