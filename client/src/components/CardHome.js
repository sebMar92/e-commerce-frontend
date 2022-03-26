import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { postOrder } from "../Redux/Actions/actions";
import { useDispatch} from "react-redux";

export default function CardHome({ id, image, title, price }) {
  const dispatch = useDispatch();

 
function addCart(){
  let token= window.localStorage.getItem('access')
 dispatch(postOrder({
   status: "inCart",
 amount: 1,
productId: id

},token))

  }

  
  function addWishList(){
    let token= window.localStorage.getItem('access')
   dispatch(postOrder({
     status: "inWishList",
   amount: 1,
  productId: id
  
  },token))
  
    }

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
              <GrFavorite onClick={(e=> addWishList(e))} className="text-2xl hover:scale-125 hover:cursor-pointer" />
              <AiOutlineShoppingCart onClick={(e=> addCart(e))} className="text-2xl hover:scale-125 hover:cursor-pointer"/>
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
