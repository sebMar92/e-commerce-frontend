import React, { useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProductByID } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import Star from "../utils/star-regular-24.png";
import Slider from "./Slider";

export default function ProductDetails() {
  const admin = useSelector((state) => state.home.admin);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let { idProduct } = useParams();

  useEffect(() => {
    dispatch(getProductByID(idProduct));
  }, [dispatch, idProduct]);

  const product = useSelector((state) => state.productID.product);

  console.log(product);

  const desc = product.description && product.description.split(".");
  const description = desc && desc.slice(0, -1);

  console.log(description);

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
            {/* <Link className="ml-auto" to={"/wishlist/:idUser"} >
                        <img src={Star} />
                    </Link> */}
          </div>
          <div
            id="product_container"
            className="p-2 bg-white rounded shadow-sm my-2"
          >
            <div className="flex justify-end">
              <div>
                <button>
                  <img
                    className="h-10 w-10 p-1 hover:scale-125"
                    src="https://cdn-icons-png.flaticon.com/128/483/483923.png"
                    alt=""
                  />
                </button>
              </div>
              <div>
                <button>
                  <img
                    className="h-10 w-10 p-1 hover:scale-125"
                    src="https://cdn-icons.flaticon.com/png/128/2874/premium/2874821.png?token=exp=1648083606~hmac=839349f9cabeac79cb4496ac3d098c97"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className="p-2 border-b-[1px] border-b-primary-300 font-lora">
              <h2 className="2xl:text-2xl">{product && product.title}</h2>
            </div>
            <div className="">
              <Slider images={product.images} />
              <div className="flex flex-col justify-center items-center border-t-[1px] border-t-primary-300 2xl:border-0 2xl:p-2">
                <div className="flex justify-between w-full p-2">
                  <div className="text-3xl font-bold text-primary-700 font-lora flex justify-center items-center">
                    <span>U$S {product.price}</span>
                  </div>
                  <Link
                    className="rounded no-underline h-fit w-fit font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700 pointer-events-none"
                    to={"/cart/:idUser"}
                  >
                    ADD TO CART
                  </Link>
                </div>
                <div className="p-2 border-[1px] border-primary-300 rounded flex flex-col items-center w-1/2">
                  <h2 className="pb-2 border-b-[1px] border-b-primary-300 font-lora">
                    Description
                  </h2>
                  <div className="text-sm pt-2">
                    {desc &&
                      desc.map((el) => {
                        return description.indexOf(el) % 2 === 0 ? (
                          <div className="p-2 bg-primary-200 rounded">
                            <p>{el}</p>
                          </div>
                        ) : (
                          <div className="p-2 rounded">
                            <p>{el}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
