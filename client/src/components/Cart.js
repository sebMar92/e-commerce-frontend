import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import CardCart from "./CardCart";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdRestaurantMenu } from "react-icons/md";
import { getOrder, changeOrderStatus } from "../Redux/Actions/actions";
import carrito from "./utils/carrito triste.png";

export default function Cart({ }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.home.inCart);

  const [total, setTotal] = useState(0);

  const resPutOrder = useSelector((state) => state.home.resPutOrder);

  useEffect(() => {
    dispatch(getOrder({ status: "inCart" }));
  }, [resPutOrder]);

  function handleAllBuy() {
    product && product.forEach((e) => {
      const id = e.orders[0].id;
      dispatch(
        changeOrderStatus({
          id: id,
          status: "finished",
        })
      );
    });
  }

  return (
    <div>
      <NavBar />

      {product && product.length > 0 ? (
        product.map((prod) => {
          return (
            <div>
              <CardCart
                id={prod.id}
                idOrder={prod.orders && prod.orders[0].id}
                key={prod.id}
                title={prod.title}
                price={prod.price}
                images={prod.images && prod.images[0].url}
                shippingCost={prod.shippingCost}
                stock={prod.stock}
                amount={prod.orders && prod.orders[0].amount}
              />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center m-10">
          <h1 className="font-serif">This cart is empty</h1>
        </div>
      )}

      {product && product.length > 0 ? (
        <>
        <div>
          <div className="flex flex-wrap justify-center">
            <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
              <div className="flex justify-end mx-8 my-2">
                <h5 className="text-xs text-gray-900">
                  Shipping Cost $00.00{}
                </h5>
              </div>
              <div className="flex justify-end mx-8 my-2">
                {/*  {product.map(suma=> {
                  setTotal+=suma.price*suma.amount
                })} */}
                <h1 className="text-1xl  text-gray-900">Total ${total}</h1>
              </div>
              <div className="mx-5">
                <h1>Shipment</h1>
                <span>Direction: {}</span>
                <br />
                <button className="bg-[#3b82f6] text-white p-1 m-2 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition">
                  Change direction
                </button>
              </div>
            </div>
          </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => handleAllBuy()}
              className="bg-[#3b82f6] text-white p-1 my-8 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition  w-24"
            >
              Buy All
            </button>
          </div>

      <div className="flex justify-center">
        <button
          onClick={() => handleAllBuy()}
          className="bg-[#3b82f6] text-white p-1 my-8 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition  w-24"
        >
          Buy All
        </button>
      </div>
      </>
      ) : (
        <div className="flex justify-center">
          {" "}
          <img className="w-36 mx-10 m-10 animate-bounce" src={carrito} alt="" />{" "}
        </div>
      )}
      <Footer />
    </div>
  );
}
