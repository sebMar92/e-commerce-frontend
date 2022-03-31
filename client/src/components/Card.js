import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { useDispatch, useSelector} from "react-redux";
import { postOrder, deleteOrder} from "../Redux/Actions/actions";


export default function Card({ id, image, name, price, shippingCost, path, onClick,onClick2, title, stock, description, images }) {
const dispatch = useDispatch();
const notifyCatCLick = onClick
const notifyCatClick2 = onClick2

  function addCartCategories(){
  dispatch(postOrder({
    status: "inCart",
      amount: 1,
      productId: id,
      title: title,
      shippingCost: shippingCost,
      stock: stock,
      description: description,
      images: images,
      price: price
    }))
  }
  

  function addFavCategories(){
    dispatch(postOrder({
      status: "inWishList",
        amount: 1,
        productId: id,
        title: title,
      shippingCost: shippingCost,
      stock: stock,
      description: description,
      images: images,
      price: price
      }))
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
              <GrFavorite onClick={() => {addFavCategories() ; notifyCatCLick()}} className="text-2xl hover:scale-125 hover:cursor-pointer active:scale-110" />
              <AiOutlineShoppingCart onClick={() => {addCartCategories() ; notifyCatClick2() }} className="text-2xl hover:scale-125 hover:cursor-pointer active:scale-110"/>
          </div>
        </div>
      </div>
    </>
  );
}
