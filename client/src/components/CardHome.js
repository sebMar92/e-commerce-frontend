import {React, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { postOrder, deleteOrder } from "../Redux/Actions/actions";
import { useDispatch} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardHome({ id, image, title, price,onClick,onClick2, shippingCost, stock, description,images, wishListDB, cartDB, token, deleted, postOrders, globalSales, productSales, categorySales}) {
  const dispatch = useDispatch();

  const [selectedWishList, setSelectedWishList] = useState(false)
  const [selectedCart, setSelectedCart] = useState(false)
  const [cartLS, setCartLS] = useState(window.localStorage.getItem("inCart"))
  const [wishListLS, setWishListLS] = useState(window.localStorage.getItem("inWishList"))
  const [saleON, setSaleON] = useState(false);
  const [saleSelected, setSaleSelected] = useState(undefined);
  
  
  useEffect(() => {
    if (token) {
      const foundProductInCart = (!cartDB || cartDB.error == "couldn't find orders" || cartDB.length === 0) 
            ? null
            : cartDB.find(el => el.id == id);
      const foundProductInWishList = (!wishListDB || wishListDB.error == "couldn't find orders" || wishListDB.length === 0) 
            ? null
            : wishListDB.find(el => el.id == id);
      if(foundProductInCart) {
        setSelectedCart(true)
      } else {
        setSelectedCart(false)
      }
      if(foundProductInWishList) {
        setSelectedWishList(true)
      } else {
        setSelectedWishList(false)
      }
    } else {
        setCartLS(window.localStorage.getItem("inCart"))
        setWishListLS(window.localStorage.getItem("inWishList"))

        const parsedCart = JSON.parse(cartLS)
        const parsedWishList = JSON.parse(wishListLS)
        
        const foundProductInCart = (cartLS === null || cartLS.length === 0) 
            ? null
            : parsedCart && parsedCart.find(el => el.productId == id)

        const foundProductInWishList = (wishListLS === null || wishListLS.length === 0)
            ? null
            : parsedWishList && parsedWishList.find(el => el.productId == id)
        
        if(foundProductInCart) {
          setSelectedCart(true)
        } else {
          setSelectedCart(false)
        }
        if(foundProductInWishList) {
          setSelectedWishList(true)
        } else {
          setSelectedWishList(false)
        }
    }

    const date = Date();
    const days = [];
    if (productSales && productSales.length > 0) {
      for (const sale of productSales) {
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          days.push(sale);
        }
      }
    }
    if (categorySales && categorySales.length > 0) {
      for (const sale of categorySales) {
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          days.push(sale);
        }
      }
    }
    if (globalSales && globalSales.length > 0) {
      for (const sale of globalSales) {
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          days.push(sale);
        }
      }
    }
    if (days.length > 0) {
      const sortedDays = days.sort((a, b) => b.percentage - a.percentage);
      setSaleSelected(sortedDays[0]);
      setSaleON(true);
    }
  },[cartLS, wishListLS, deleted, postOrders, wishListDB, cartDB, productSales])

    
  function addCart(){
    if (!selectedCart) {
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
      }));
      toast.success('Added to the cart !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      const foundProductInCart = cartDB && cartDB.find(el => el.id == id);
      const orderId = foundProductInCart && foundProductInCart.orders[0].id
      dispatch(deleteOrder(
      orderId,
      id,
      "inCart"
      ))
      toast.error('Removed from cart !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    setCartLS(window.localStorage.getItem("inCart"))
    }

    function addFav(){
      if(!selectedWishList) {
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
        toast.success('Added to the wishlist !', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        const foundProductInWL = wishListDB && wishListDB.find(el => el.id == id);
        const orderId = foundProductInWL && foundProductInWL.orders[0].id
        dispatch(deleteOrder(
          orderId,
          id,
          "inWishList"
        ))
        toast.error('Removed from wishlist !', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    setWishListLS(window.localStorage.getItem("inWishList"))
    } 



  return (
    <div className={
      (saleON && saleSelected.percentage ? 'border-t-[2px] border-orange-600 ' : '') +
      'flex rounded shadow-sm bg-white scale-95 hover:scale-100 relative '
    }>
      {saleON && (productSales.length > 0 || saleSelected.percentage) && (
            <div className="absolute inset-x-0 mx-auto -translate-y-4 border-[2px] border-orange-600 h-fit w-fit p-1 rounded text-base bg-white font-lora font-extrabold	 text-orange-600">
              <p>
                {saleON &&
                  ((productSales.length > 0 && productSales[0].percentage) ||
                    saleSelected.percentage)}
                % OFF{' '}
                {productSales.length > 0
                  ? productSales[0].productAmount > 0
                    ? `on ${productSales[0].productAmount + 1}º unit`
                    : ''
                  : saleSelected.productAmount > 0
                  ? `on ${saleSelected.productAmount + 1}º unit`
                  : ''}
              </p>
            </div>
          )}
      <div className="w-full rounded overflow-hidden shadow-lg h-full">
        <Link to={`/product/${id}`} className="no-underline">
          <div className="flex justify-center m-3">
            <img className="h-36  rounded-lg" src={image} alt="img" />
          </div>

          <div className="m-1">
            <div className="font-bold text-xl flex justify-center ">
            <p className="font-semibold tracking-tight h-12 text-gray-900 dark:text-white text-base">
              {title}
            </p>
            </div>
          </div>
        </Link>
        <div className="pt-7">
          <span className="flex flex-row justify-around">
          <button
                    onClick={() => addFav()}
                    className={(selectedWishList ? "bg-primary-400 " : "bg-white ") + "flex items-center justify-center gap-2 rounded no-underline h-fit w-10 md:w-11 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md active:scale-95"}
                    >
                    <AiOutlineHeart className="h-4 w-4 md:h-5 md:w-5 inline-block" color={selectedWishList ? "#ffffff" : "#FEBD70"} />
                  </button>
                  <button
                    onClick={() => addCart()}
                    className={(selectedCart ? "bg-primary-400 " : "bg-white ") + "flex items-center justify-center gap-2 rounded no-underline h-fit w-10 md:w-11 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md active:scale-95"}
                    to={'/cart'}
                    >
                    <AiOutlineShoppingCart className="h-4 w-4 md:h-5 md:w-5 inline-block" color={selectedCart ? "#ffffff" : "#FEBD70"} />
                  </button>
          </span>
          
          <div className="pt-4 flex justify-center items-center font-lora">
          {productSales && productSales.length > 0 ? (
              productSales[0].productAmount === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={
                      (saleON && saleSelected.percentage
                        ? 'text-sm text-primary-400 line-through	xl:text-xl '
                        : 'text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black') +
                      'font-bold xl:border-b-[1px] xl:border-primary-300'
                    }
                  >
                    ${price}
                  </p>
                  {saleON && saleSelected.percentage ? (
                    <p className="font-bold text-primary-700 text-xl xl:text-2xl xl:border-b-[1px] xl:border-primary-300 2xl:text-3xl 2xl:font-black">
                      $
                      {(
                        price -
                        price *
                          ((productSales.length > 0 &&
                            productSales[0].percentage / 100) ||
                            saleSelected.percentage / 100)
                      ).toFixed(2)}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300">
                  ${price}
                </p>
              )
            ) : saleSelected && saleSelected.productAmount === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <p
                  className={
                    (saleON && saleSelected.percentage
                      ? 'text-sm text-primary-400 line-through	xl:text-xl '
                      : 'text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black') +
                    'font-bold xl:border-b-[1px] xl:border-primary-300'
                  }
                >
                  ${price}
                </p>
                {saleON && saleSelected.percentage ? (
                  <p className="font-bold text-primary-700 text-xl xl:text-2xl xl:border-b-[1px] xl:border-primary-300 2xl:text-3xl 2xl:font-black">
                    $
                    {(
                      price -
                      price *
                        ((productSales.length > 0 && productSales[0].percentage / 100) ||
                          saleSelected.percentage / 100)
                    ).toFixed(2)}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300">
                ${price}
              </p>
            )}
            </div>
        </div>
      </div>

    </div >
  );
}
