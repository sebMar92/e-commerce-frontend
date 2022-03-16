import React from "react";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";
import Product from "./utils/R.png";


export default function Card({ image, name, price, shippingCost }) {
  return (
    <div className="flex flex-wrap content-center">
      <div className=" md:w-96 rounded-xl p-2 m-2 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          
        <div className="flex p-3">
          <div>
            <img className="h-full"
                 /* src={image} */   
                 src={Product}  
              alt={name}
            />
            
          </div>
          <div className="m-3 items-center">
            <h3 className="text-xl">Name {name}</h3>
            <br/>
            <p>Price{price}</p>
            <p>Shipping Cost{shippingCost}</p>
            <br/>
            <br/>
            <div className="flex justify-around">
                <Link to={"/wishlist/:idUser"} style={{textDecoration: "inherit"}}> 
                     <img  className="p-1 hover:p-0" src={Star}/>
                </Link>
                <Link to={"/cart/:idUser"} style={{textDecoration: "inherit"}}> 
                     <img className="p-1 hover:p-0" src={Cart}/>
                </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
