import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { useDispatch, useSelector} from "react-redux";
import { postOrder, deleteOrder} from "../Redux/Actions/actions";
import { MdLocalShipping } from 'react-icons/md';


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
      
        <div id="card" className="flex rounded shadow-sm w-full bg-white lg:w-[48%] lg:justify-center">
          
            <div className="w-1/4 h-[170px] p-2 lg:h-[210px] lg:w-[35%]">
              <Link to={"/product/" + path} className="no-underline text-black">
                <div className="h-full w-full p-2 rounded hover:shadow-lg border-[1px] border-primary-300 hover:border-primary-700">
                  <img
                    className="h-full w-full rounded object-scale-down md:object-contain"
                    src={image}
                    alt={name}
                    />
                </div>
              </Link>
            </div>
              <div className="w-3/4 flex flex-col gap-2 justify-between p-2 lg:w-[65%]">
                  <div className="border-b-[1px] border-primary-300 p-2 flex items-center justify-center text-center">
                    <h3 className="text-sm font-lora font-bold md:text-base">{name}</h3>
                  </div>
                  <div className="flex justify-evenly items-center font-lora ">
                    <p className="font-bold text-primary-700 text-xl xl:text-2xl xl:border-b-[1px] xl:border-primary-300 2xl:text-3xl 2xl:font-black">${price}</p>
                    <div className="flex items-center gap-2">
                      <MdLocalShipping className="h-6 w-6" color="#FEBD70" />
                      <p className="flex gap-2 items-center md:text-base font-medium">${shippingCost}</p>
                    </div>
                  </div>
                
                <div id="container2" className="flex justify-center gap-7">
                  <div className="h-fit p-2 flex">
                    <button
                      onClick={() => {addFavCategories() ; notifyCatCLick()}}
                      className="flex items-center justify-center gap-2 rounded no-underline h-fit w-10 md:w-11 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md active:scale-95"
                      >
                      <AiOutlineHeart className="h-4 w-4 md:h-5 md:w-5" color="#FEBD70" />
                    </button>
                  </div>

                  <div className="h-fit p-2 flex">
                    <button
                      onClick={() => {addCartCategories() ; notifyCatClick2() }}
                      className="flex items-center justify-center gap-2 rounded no-underline h-fit w-10 md:w-11 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700 hover:shadow-md active:scale-95"
                      to={'/cart'}
                      >
                      <AiOutlineShoppingCart className="h-4 w-4 md:h-5 md:w-5" color="#ffffff" />
                    </button>
                  </div>
                </div>
              </div>
        </div>
      
    </>
  );
}
