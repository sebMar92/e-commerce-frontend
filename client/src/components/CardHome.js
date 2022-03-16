import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";
import Product from "./utils/Notebook-Odyssey-2.jpg";


export default function CardHome({ image, name, price }) {
  return (
    <div className="md:w-64 h-96 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="/product/:idProduct">
        <img className="p-3 rounded-t-lg" src={Product} /* src={image} */ alt="product image" />
    </a>
    <br/>
    <div class="px-5 pb-5">
        <a href="/product/:idProduct">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Name{name}</h5>
        </a>
        <div className="flex flex-wrap justify-around items-center mt-2.5 mb-5">
        <Link to={"/wishlist/:idUser"} > 
                     <img  className="p-2 hover:w-10" src={Star}/>
                </Link>
                <Link to={"/cart/:idUser"} style={{textDecoration: "inherit"}}> 
                     <img className="p-2 hover:w-10" src={Cart}/>
                </Link>
        </div>
        <div claclassNamess="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">Price{price}</span>
            
        </div>
    </div>
</div>
       
  );
}
