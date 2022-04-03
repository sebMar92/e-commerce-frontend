import React,{useEffect, useState,useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeOrderStatus } from "../../Redux/Actions/actions";
import Preview from "./Preview";
import axios from "axios";

export default function Checkout({ products, data }) {
  const dispatch = useDispatch()
  const userDirection = useSelector((state) => state.home.user.directions)
  const total = products && products.map((item) => item.price * item.orders[0].amount).reduce((prev, curr) => prev + curr, 0);
  const location = useLocation()
  const [resp,setRes] = useState("")

  useEffect(() =>{
    if(location.search.length){
    const res = axios.get("http://localhost:3001/mercadopago/feedback" + location.search)
    .then((res) =>{
      console.log(res)
      setRes(res.data)
    })
  }
  },[location.search])

  useEffect(() => {
    if(resp && resp.Status === "approved"){
      products &&
      products.forEach((e) => {
        const id = e.orders[0].id;
        console.log(id)
        dispatch(
          changeOrderStatus({
            id: id,
            status: "finished",
          })
        )
    })
  }
  }, [resp])





    useEffect(() => {
      const script = document.createElement("script");
  
      const attr_data_preference = document.createAttribute("data-preference-id");
      attr_data_preference.value = data.id;

      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      script.class =
        "px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500";
      script.setAttributeNode(attr_data_preference);
      document.getElementById("form1").appendChild(script);
      return () => {
        document.getElementById("form1").removeChild(script);
      };
    }, [data]);

  
    return (
      <div className="flex flex-col items-center">
        <form id="form1" className="w-fit">
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
                {userDirection && userDirection.map((e) => {
                    return <option key={e.id}>{e.city}</option>
                })}
              </select>
            </label>
        <div>
          <h1>Total price: {total}</h1>
        </div>
        </form>
      </div>
    );
  }