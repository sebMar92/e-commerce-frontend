import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";

export default function CardHome({ id, image, title, price }) {
  return (
    <div className=" shadow-md shadow-slate-300 hover:shadow-slate-500 rounded-lg scale-95 hover:scale-100">
      <div className="max-w-sm rounded overflow-hidden shadow-lg h-full">
        <Link to={`/product/${id}`} className="no-underline">
          <div className="flex justify-center m-3">
            <img className="h-36  rounded-lg" src={image} alt="img" />
          </div>

          <div className="m-1">
            <div className="font-bold text-xl flex justify-start "></div>
            <p className="font-semibold tracking-tight h-12 text-gray-900 dark:text-white text-base">
              {title}
            </p>
          </div>
        </Link>
        <div className="pt-5">
          <span className="flex flex-row justify-around">
            {/* <Link to={"/wishlist/:idUser"} className="disable"> */}
            <img className="p-2 hover:scale-125" src={Star} alt="img" />
            {/*  </Link> */}
            {/* <Link to={"/cart/:idUser"} style={{ textDecoration: "inherit" }}> */}
            <img className="p-2 hover:scale-125" src={Cart} alt="img" />
            {/*  </Link> */}
          </span>
          <br />
          <span className="flex justify-center text-3xl font-bold text-gray-900 mr-2 mb-2 dark:text-white">
            ${price}
          </span>
        </div>
      </div>

    </div >
  );
}
