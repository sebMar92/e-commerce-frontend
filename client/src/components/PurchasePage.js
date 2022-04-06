import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Checkout from './Mercadopago/Checkout';
import axios from 'axios';
import { getBulkOrders, getOrder } from '../Redux/Actions/actions';
import NavBarEmpty from './NavBarEmpty';
import { useLocation } from 'react-router-dom';

export default function PurchasePage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.home.pending);
  const bulkOrders = useSelector((state) => state.home.bulkOrders);
  const direccion = useSelector((state) => state.home.user.directions);
  const resPutOrder = useSelector((state) => state.home.resPutOrder);
  const resDelete = useSelector((state) => state.home.deleted);
  const location = useLocation();
  const [data, setData] = useState('');

  useEffect(() => {
    dispatch(getOrder({ status: 'pending' }));
    dispatch(getBulkOrders({ status: 'pending' }));
  }, [resDelete, location.search]);

  useEffect(() => {
    let item = [];
    // if (bulkOrders && bulkOrders.length > 0) {
    //   console.log('BULKS EN PURCHASE: ', bulkOrders);
    //   item =
    //     bulkOrders && bulkOrders[0].products
    //       ? bulkOrders[0].products.map((e) => ({
    //           title: e.title,
    //           amount: 1,
    //           price: e.price,
    //         }))
    //       : [];
    //   let shippingCost = {
    //     title: 'shippingCost',
    //     amount: 1,
    //     price: bulkOrders[0].combinedShippingCost,
    //   };
    //   item.push(shippingCost);
    // } else
    if (product && product.length > 0) {
      item = product
        ? product.map((e) => ({
            title: e.title,
            amount: e.orders.amount || 1,
            price: e.price,
          }))
        : [];
      let res = 0;
      for (const it of product) {
        console.log(it);
        res = res + it.shippingCost;
      }
      let shippingCost = { title: 'shippingCost', amount: 1, price: res };
      item.push(shippingCost);
    }
    if ((product && product.length) || (bulkOrders && bulkOrders.length)) {
      const idToken = axios
        .post('/mercadopago/pay', item)
        .then((data) => {
          //id
          setData(data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [product, bulkOrders]);

  return (
    <>
      <NavBarEmpty />
      {data && <Checkout data={data} products={product} />}
      <Footer />
    </>
  );
}
