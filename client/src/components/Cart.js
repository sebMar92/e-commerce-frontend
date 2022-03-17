import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import CardCart from "./CardCart";

export default function Cart({}) {
  return (
    <div>
      <NavBar />

      <h1>This is Cart</h1>

      <CardCart />

      {/*  total envio  */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
          <div className="flex justify-end mx-8 my-2">
            <h5 ClassName="text-xs text-gray-900">Shipping Cost $2.000 {}</h5>
          </div>
          <div className="flex justify-end mx-8 my-2">
            <h1 ClassName="text-1xl  text-gray-900">Total $ 10.000{}</h1>
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

      {/* informacino de pago  */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-secondary-100 w-9/12 m-5 p-5 rounded-md ">
          <h1>Payment information </h1>
          <br />
          <button className="bg-black text-white p-1 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition m-2">
            Tarjeta
          </button>
          <button className="bg-black text-white p-1 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition m-2">
            efectivo
          </button>
          <div>payment information</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#3b82f6] text-white p-1 my-8 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition  w-24">
          Buy
        </button>
      </div>
      <Footer />
    </div>
  );
}
