import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";
import { postOrder } from "../Redux/Actions/actions";


export default function Card({ id, image, name, price, shippingCost, path }) {
const dispatch = useDispatch();

 
function addCart(){
  let token= window.localStorage.getItem('access')
 dispatch(postOrder({
   status: "inCart",
 amount: 1,
productId: id

},token))

  }

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
            {/* <Link to={"/wishlist/:idUser"} style={{ textDecoration: "inherit" }}> */}
            <img className="p-1 hover:scale-125" src={Star} />
            {/* </Link> */}
            {/* <Link to={"/cart/:idUser"} style={{ textDecoration: "inherit" }}> */}
              <img onClick={(e=> addCart(e))} className="p-1 hover:scale-125" src={Cart} />
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
