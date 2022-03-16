import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";
import Product from "./utils/Notebook-Odyssey-2.jpg";


export default function CardHome({ image, name, price, shipping }) {
  return (
    <div className="md:w-64 md:h-96 h-4/6 bg-secondary-100 rounded-lg shadow-md m-auto hover:scale-105">
        <a href="/product/:idProduct">
            <img className="p-3 rounded-t-lg" src={Product} /* src={image} */ alt="product image" />
        </a>
    <br/>
    <div className="px-5 pb-5">
            <a href="/product/:idProduct">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Laptop{name}</h5>
            </a>
            <div>
                <span className="text-3xl font-bold text-gray-900">$10,000{price}</span>
            </div>
            <div className="flex flex-wrap justify-around items-center my-4">
                    <Link to={"/wishlist/:idUser"} > 
                            <img  className="p-2 hover:w-10" src={Star}/>
                    </Link>
                    <Link to={"/cart/:idUser"} style={{textDecoration: "inherit"}}> 
                            <img className="p-2 hover:w-10" src={Cart}/>
                    </Link>
            </div>
            <p>Envio Gratis {shipping}</p>
    </div>
</div>  
    );
}
