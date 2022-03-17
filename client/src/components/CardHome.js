import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";

export default function CardHome({ image, title, price }) {
/* return (
    <div classNameName="md:w-64 h-96 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="/product/:idProduct">
        <img classNameName="p-3 rounded-t-lg" src={image} alt="img" />
    </a>
    <br/>
    <div classNameName="px-5 pb-5">
        <a href="/product/:idProduct">
            <h5 classNameName="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
        <div classNameName="flex flex-wrap justify-around items-center mt-2.5 mb-5">
        <Link to={"/wishlist/:idUser"} > 
                    <img  classNameName="p-2 hover:w-10" src={Star} alt="img"/>
                </Link>
                <Link to={"/cart/:idUser"} style={{textDecoration: "inherit"}}> 
                    <img classNameName="p-2 hover:w-10" src={Cart} alt="img"/>
                </Link>
        </div>
        <div classNameName="flex justify-between items-center">
            <span classNameName="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
            
        </div>
    </div>
</div>
       
  ); */
  return(
  <div className="p-10">  
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <a href="/product/:idProduct">
        <div className="flex justify-center">
        <img className="h-36" src={image} alt="img"/>
        </div>
    </a>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2"></div>
      <p className="font-semibold tracking-tight h-36 text-gray-900 dark:text-white text-base">
        {title}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
        <span className="flex flex-wrap justify-around">
            <Link to={"/wishlist/:idUser"} > 
                <img  className="p-2 hover:w-10" src={Star} alt="img"/>
            </Link>
            <Link to={"/cart/:idUser"} style={{textDecoration: "inherit"}}> 
                <img className="p-2 hover:w-10" src={Cart} alt="img"/>
            </Link>
        </span>
        <br/>
        <span className="inline-block text-3xl font-bold text-gray-900 mr-2 mb-2 dark:text-white">{price}</span>
    </div>
  </div>
</div>
);
}
