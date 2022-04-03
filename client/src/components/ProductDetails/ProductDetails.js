import React, { useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { clearProductDetail, getProductByID, postOrder, deleteOrder, getOrder} from '../../Redux/Actions/actions';
import { useEffect } from 'react';
import Slider from './Slider';
import CreateComment from '../Comment/CreateComment';
import { FaBan } from 'react-icons/fa';
import {
  AiOutlineCheckCircle,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { MdLocalShipping } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';
import ButtonBuy from '../commons/ButtonBuy';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductDetails() {
  const admin = useSelector((state) => state.home.admin);
  const render = useSelector((state) => state.home.resAmountOrder);
  const product = useSelector((state) => state.productID.product);
  const wishListDB = useSelector((state) => state.home.inWishList);
  const cartDB = useSelector((state) => state.home.inCart)
  const token = window.localStorage.getItem("access")
  const [cartLS, setCartLS] = useState(window.localStorage.getItem("inCart"))
  const [wishListLS, setWishListLS] = useState(window.localStorage.getItem("inWishList"))
  const deleted = useSelector((state) => state.home.deleted)
  const postOrders = useSelector((state) => state.home.postOrders)
  const [selectedWishList, setSelectedWishList] = useState(false)
  const [selectedCart, setSelectedCart] = useState(false)

  const dispatch = useDispatch();
  let { idProduct } = useParams();
  
  useEffect(() => {
    dispatch(getOrder({ status: "inCart" }))
    dispatch(getOrder({ status: "inWishList" }))
    dispatch(getProductByID(idProduct));
    return () => {
      dispatch(clearProductDetail())
    }
  }, [dispatch, idProduct, render]);

  useEffect(() => {
    if (token) {
      const foundProductInCart = (!cartDB || cartDB.error == "couldn't find orders" || cartDB.length === 0) 
            ? null 
            : cartDB.find(el => el.id == idProduct);
      const foundProductInWishList = (!wishListDB || wishListDB.error == "couldn't find orders" || wishListDB.length === 0) 
            ? null 
            : wishListDB.find(el => el.id == idProduct);
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
            : parsedCart && parsedCart.find(el => el.productId == idProduct)

        const foundProductInWishList = (wishListLS === null || wishListLS.length === 0)
            ? null
            : parsedWishList && parsedWishList.find(el => el.productId == idProduct)
        
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
  },[cartLS, wishListLS, deleted, postOrders, wishListDB, cartDB])


  const desc = product.description && product.description.split('.');
  const description = desc && desc.slice(0, -1);

  const notifyDetail3 = () => {
    toast.success("Purchase successfull !", {
      position: toast.POSITION.BOTTOM_LEFT
    });
  };


  function addCartDetails() {
    if(!selectedCart) {
          dispatch(
            postOrder({
              status: 'inCart',
              amount: 1,
              productId: idProduct,
              title: product.title,
              shippingCost: product.shippingCost,
              stock: product.stock,
              description: product.description,
              images: product.images,
              price: product.price,
              id: idProduct
            })
            );
            toast.success('Added to the cart !', {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          } else {
              const foundProductInCart = cartDB && cartDB.find(el => el.id == idProduct);
              const orderId = foundProductInCart && foundProductInCart.orders[0].id
              dispatch(deleteOrder(
              orderId,
              idProduct,
              "inCart"
              ))
              toast.error('Removed from cart !', {
                position: toast.POSITION.BOTTOM_LEFT,
              });
            }
    setCartLS(window.localStorage.getItem("inCart"))
  }

  function addFavDetails() {
    if(!selectedWishList) {
      dispatch(
        postOrder({
          status: 'inWishList',
          amount: 1,
          productId: idProduct,
          title: product.title,
          shippingCost: product.shippingCost,
          stock: product.stock,
          description: product.description,
          images: product.images,
          price: product.price,
          id: idProduct
        })
        );
        toast.success('Added to the wishlist !', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        const foundProductInWL = wishListDB && wishListDB.find(el => el.id == idProduct);
        const orderId = foundProductInWL.orders[0].id
        dispatch(deleteOrder(
          orderId,
          idProduct,
          "inWishList"
        ))
        toast.error('Removed from wishlist !', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    setWishListLS(window.localStorage.getItem("inWishList"))
  }

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={2000} />
      <div className="bg-secondary-100">
        <div id="main_container" className="w-11/12 pb-2 mx-auto 2xl:w-9/12">
          <div id="category_container" className="pt-2 flex gap-2">
            {product.categories &&
              product.categories.map((el) => (
                <div className="w-fit h-fit p-2 bg-white rounded shadow-sm text-xs 2xl:text-sm">
                  {el.name}
                </div>
              ))}
          </div>

          <div id="slider_container" className="p-2 bg-white rounded shadow-sm my-2">
            <div className="p-2 border-b-[1px] border-b-primary-300 font-lora">
              <h2 className="2xl:text-2xl">{product && product.title}</h2>
            </div>
            <Slider images={product.images} />
          </div>

          <div
            id="description_addCart_container"
            className="flex flex-col w-full gap-6 pt-4 font-lora "
          >
            <div
              id="add_to_cart_container"
              className="w-full bg-white rounded p-2 flex flex-col gap-3 items-center justify-center lg:flex-row "
            >
              <div className="flex gap-2 text-4xl items-center w-4/5 justify-center text-bold text-primary-700">
                <span className="pb-2 border-b-[1px] border-primary-400">
                  U$S {product.price}
                </span>
              </div>

              <div className="flex gap-2 text-xl items-center w-full justify-center">
                <MdLocalShipping className="h-6 w-6" color="#FEBD70" />
                <span>u$s {product.shippingCost}</span>
              </div>

              {product && product.stock > 1 ? (
                <div className="flex gap-2 text-xl items-center w-full justify-center">
                  <AiOutlineCheckCircle className="h-6 w-6" color="#FEBD70" />
                  <span>Stock: {product.stock}</span>
                </div>
              ) : (
                <div className="flex gap-2 text-xl items-center w-full justify-center">
                  <FaBan className="h-6 w-6 " color="red" />
                  <span>No stock available</span>
                </div>
              )}
              <div className="h-fit p-2 flex">
                <button
                  onClick={(e) => {
                    addFavDetails();
                  }}
                  className={(selectedWishList ? "bg-primary-400 " : "bg-white ") + "flex items-center justify-center gap-2 rounded no-underline h-fit w-12 bg-white font-bold p-2 border-[1px] border-primary-400 font-lora hover:border-primary-700 hover:text-primary-700 hover:shadow-md active:scale-95"}
                >
                  <AiOutlineHeart className="h-6 w-6 inline-block" color={selectedWishList ? "#ffffff" : "#FEBD70"} />
                </button>
              </div>

              <div className="h-fit p-2 flex">
                <button
                  onClick={() => {
                    addCartDetails();
                  }}
                  className={(selectedCart ? "bg-primary-400 " : "bg-white ") + "flex items-center justify-center gap-2 rounded no-underline h-fit w-12 bg-white font-bold p-2 border-[1px] border-primary-400 font-lora hover:border-primary-700 hover:text-primary-700 hover:shadow-md active:scale-95"}
                >
                  <AiOutlineShoppingCart className="h-6 w-6 inline-block" color={selectedCart ? "#ffffff" : "#FEBD70"} />
                </button>
              </div>
              <div >
                <ButtonBuy
                  id={idProduct}
                  status={'finished'}
                  amount={1}
                  text={'Buy'}
                  onClick={notifyDetail3}
                />
              </div>
            </div>

            <div
              id="description_container"
              className="p-2 full bg-white rounded flex flex-col "
            >
              <div className="p-2 border-b-[1px] border-primary-300">
                <h2 className="font-lora">Description</h2>
              </div>
              <div className="text-sm pt-2 pl-3 flex flex-col gap-2 pb-4 marker:primary-300">
                {description &&
                  description.map((el) => (
                    <div className="flex gap-2 items-center text-base">
                      <GoPrimitiveDot color="#FEBD70" />
                      <span>{el}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <CreateComment id={idProduct} product={product}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
