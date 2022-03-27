import React, { useState } from "react";
import NavBar from "../NavBar";
import Footer from '../Footer/Footer';
import { useDispatch, useSelector} from "react-redux"
import { useParams, Link } from 'react-router-dom';
import { getProductByID, postOrder } from '../../Redux/Actions/actions';
import { useEffect } from 'react';
import Slider from "./Slider";
import CreateComment from "../Comment/CreateComment";
import { FaBan } from "react-icons/fa";
import {AiOutlineCheckCircle, AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai"
import {MdLocalShipping} from "react-icons/md"
import {GoPrimitiveDot} from "react-icons/go"


export default function ProductDetails() {
  const admin = useSelector((state) => state.home.admin);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { idProduct } = useParams();

  useEffect(() => {
    dispatch(getProductByID(idProduct));
  }, [dispatch, idProduct]);

  const product = useSelector((state) => state.productID.product);

  console.log(product)

  const desc = product.description && product.description.split(".");
  const description = desc && desc.slice(0, -1);

    
function addCart(){
    let token= window.localStorage.getItem('access')
   dispatch(postOrder({
     status: "inCart",
   amount: 1,
  productId: idProduct
  
  },token))
  
    }
  

  return (
    <>
      <NavBar />
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

        <div id="description_addCart_container" className="flex flex-col w-full gap-6 pt-4 font-lora ">  
          <div id="add_to_cart_container" className="w-full bg-white rounded p-2 flex flex-col gap-3 items-center justify-center lg:flex-row ">
      
            <div className="flex gap-2 text-4xl items-center w-4/5 justify-center text-bold text-primary-700">
              <span className="pb-2 border-b-[1px] border-primary-400">U$S {product.price}</span>
            </div>

            {product && product.stock > 1 ? 
            <div className="flex gap-2 text-xl items-center w-full justify-center">
              <AiOutlineCheckCircle className="h-6 w-6" color="#FEBD70" />
              <span>Stock available</span>
            </div>
            : 
            <div className="flex gap-2 text-xl items-center w-full justify-center">
              <FaBan className="h-6 w-6 " color="red"/>
              <span>No stock available</span>
            </div>
            }

            <div className="flex gap-2 text-xl items-center w-full justify-center">
                <MdLocalShipping className="h-6 w-6" color="#FEBD70"/>
                <span>u$s {product.shippingCost}</span>
            </div>

            <div className="h-fit p-2 flex">
              <Link 
                className="flex items-center justify-center gap-2 rounded no-underline h-fit w-12 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md"
                to={"/cart/:idUser"}>
                <AiOutlineHeart className="h-6 w-6" color="#FEBD70"/>
              </Link>
            </div>

            <div className="h-fit p-2 flex">
              <Link onClick={(e=> addCart(e))}
                className="flex items-center justify-center gap-2 rounded no-underline h-fit w-12 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700 hover:shadow-md"
                to={"/cart/:idUser"}>
                <AiOutlineShoppingCart className="h-6 w-6" color="#ffffff"/>
              </Link>
            </div>
          </div>
          <div>
            
          </div>

          <div id="description_container"className="p-2 full bg-white rounded flex flex-col ">
            <div className="p-2 border-b-[1px] border-primary-300">
              <h2 className="font-lora">
                Description
              </h2>
            </div>
              <div className="text-sm pt-2 pl-3 flex flex-col gap-2 pb-4 marker:primary-300">
                
                  {description &&
                    description.map((el) => <div className="flex gap-2 items-center text-base" >
                      <GoPrimitiveDot color="#FEBD70"/><span>{el}</span>
                    </div>)}
                
              </div>
          </div>
        </div>  

        <CreateComment id={idProduct}/>
        
        </div>
      </div>
      <Footer />
    </>
  );
}
