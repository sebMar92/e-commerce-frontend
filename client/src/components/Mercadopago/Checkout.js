import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeOrderStatus, getUserInfo } from '../../Redux/Actions/actions';
import Preview from './Preview';
import axios from 'axios';

export default function Checkout({ products, data }) {
  console.log(products)
  const dispatch = useDispatch();
  const userDirection = useSelector((state) => state.home.user.directions);
  const product = useSelector((state) => state.home.pending);
  const bulkOrder = useSelector((state) => state.home.bulkOrders);
  const location = useLocation();
  const [resp, setRes] = useState('');
  const [productPrices,setProductPrices] = useState(0)
  const [productShipping,setProductShipping] = useState(0)
  
  useEffect(() => {
    setProductPrices(products.reduce((a,b) =>({price: a.price * (a.orders && a.orders.length > 0 ? a.orders[0].amount : 1) + b.price * (b.orders && b.orders.length > 0 ? b.orders[0].amount : 1)})).price.toFixed(2))
    setProductShipping(products.reduce((a,b) =>({shippingCost: a.shippingCost + b.shippingCost})).shippingCost.toFixed(2))
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    const attr_data_preference = document.createAttribute('data-preference-id');
    attr_data_preference.value = data.id;
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.setAttributeNode(attr_data_preference);
    script.class =
      'px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 m-auto';
    script.setAttributeNode(attr_data_preference);
    document.getElementById('form1').appendChild(script);
    return () => {
      document.getElementById('form1').removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full my-20">
      <form className="w-8/12">
        {products.length &&
          products.map((product) => {
            return (
              <Preview
                title={product.title}
                images={product.images && product.images[0].url}
                id={product.id}
                idOrder={product.orders && product.orders[0].id}
                direction={userDirection}
              />
            );
          })}
        <label>
          Directions:
          <select>
            {userDirection.length ? (
              userDirection?.map((e) => {
                return <option key={e.id}>{e.city}</option>;
              })
            ) : (
              <option>Calle falsa 123</option>
            )}
          </select>
        </label>
        <div className="font-lora flex justify-evenly my-12">
{/*           {bulkOrder && bulkOrder.length > 0 ? (
            <h1 className="text-2xl">
              Products price: {bulkOrder[0].combinedPrice.toFixed(2)}
            </h1>
          ) : null}
          {bulkOrder.length > 0 ? (
            <h1 className="text-2xl">
              Shipping price: {bulkOrder && bulkOrder[0].combinedShippingCost.toFixed(2)}
            </h1>
          ) : null}
          {bulkOrder.length > 0 ? (
            <h1 className="underline decoration-primary-800">
              Total:{' '}
              {(bulkOrder[0].combinedPrice + bulkOrder && bulkOrder[0].combinedShippingCost).toFixed(
                2
              )}
            </h1>
          ) : null} */}
          {products && products.length > 0 && 
          <h1 className="text-2xl">
              Products price: {productPrices}
            </h1>}
            {products && products.length > 0 && 
          <h1 className="text-2xl">
              Shipping cost: {productShipping}
            </h1>}
            {products && products.length > 0 && 
          <h1 className="text-2xl">
              Products price: {Math.round((Number(productPrices) + Number(productShipping)) * 100) / 100}
            </h1>}
        </div>
        <form id="form1" className="flex justify-center my-10">
          <div></div>
        </form>
      </form>
    </div>
  );
}
