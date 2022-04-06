import React,{useEffect, useState,useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeOrderStatus, getUserInfo } from "../../Redux/Actions/actions";
import Preview from "./Preview";
import axios from "axios";

export default function Checkout({ products, data }) {
  console.log(products,"soy data")
  const dispatch = useDispatch()
  const userDirection = useSelector((state) => state.home.user.directions)
  const product = useSelector((state) => state.home.pending);
  const bulkOrder = useSelector((state) => state.home.bulkOrders);
  const location = useLocation()
  const [resp,setRes] = useState("")
  console.log(product)
  console.log(bulkOrder)

    useEffect(() => {
      const script = document.createElement("script");
      const attr_data_preference = document.createAttribute("data-preference-id");
      attr_data_preference.value = data.id;
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      script.class =
        "px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-auto";
      script.setAttributeNode(attr_data_preference);
      document.getElementById("form1").appendChild(script);
      return () => {
        document.getElementById("form1").removeChild(script);
      };
    }, []);

  
    return (
      <div className="flex flex-col items-center w-full my-20">
        <form className="w-8/12">
          {products.length && 
            products.map((product) =>{
              return (
              <Preview title={product.title}  
              images={product.images && product.images[0].url} 
              id={product.id} 
              idOrder={product.orders && product.orders[0].id}
              direction={userDirection}/>
              )
            })}
            <label>Directions:
              <select>
                {userDirection.length ? userDirection?.map((e) => {
                    return <option key={e.id}>{e.city}</option>
                }) : <option>Calle falsa 123</option>}     
              </select>
            </label>
        <div className="font-lora flex justify-evenly my-12">
          {bulkOrder.length > 0 ?
          <h1 className="text-2xl">Products price: {(bulkOrder[0].combinedPrice).toFixed(2)}</h1>
          : null}
          {bulkOrder.length > 0 ?
          <h1 className="text-2xl">Shipping price: {(bulkOrder[0].combinedShippingCost).toFixed(2)}</h1>
          : null}
          {bulkOrder.length > 0 ?
          <h1 className="underline decoration-primary-800">Total: {(bulkOrder[0].combinedPrice + bulkOrder[0].combinedShippingCost).toFixed(2)}</h1>
          : null}
          {product.length > 0 && !Array.isArray(bulkOrder) ?
          <h1 className="text-2xl">Product price: {(product[0].price * product[0].orders[0].amount).toFixed(2)}</h1>
          : null}
          {product.length > 0 && !Array.isArray(bulkOrder) ?
          <h1 className="text-2xl">Shipping price: {(product[0].shippingCost).toFixed(2)}</h1>
          : null}     
          {product.length > 0 && !Array.isArray(bulkOrder) ?    
          <h1 className="underline decoration-primary-800">Total: {(product[0].price * product[0].orders[0].amount + product[0].shippingCost).toFixed(2)}</h1>
          : null}
        </div>
        <form id="form1" className="flex justify-center my-10">
          <div></div>
          </form>
        </form>
      </div>
    );
  }