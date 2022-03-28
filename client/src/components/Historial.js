import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import CardHistorial from './CardHistorial';
import { getOrder } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function Historial() {
  
  const dispatch = useDispatch()
  const products = useSelector(state => state.home.finished)
  console.log('product', products)
  useEffect(() => {
    dispatch(getOrder({ status: "finished" }))
  }, [])

  return (
    <>
      <NavBar />
      <div className="historial">
        {/*<h1>This is Historial</h1>*/}
        {products.length > 0 &&
        products.map((prod) => {
          console.log(prod)
          return (
            <div>
 
              <CardHistorial 
               key={prod.id}
               title={prod.title}
               price={prod.price}
               amount={prod.orders[0].amount}
               images={prod.images[0].url}
               id={prod.id}
                
                
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
