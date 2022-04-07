import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Checkout from './Mercadopago/Checkout';
import axios from 'axios';
import { getBulkOrders, getOrder, getProducts } from '../Redux/Actions/actions';
import NavBarEmpty from './NavBarEmpty';
import { useLocation } from 'react-router-dom';

export default function PurchasePage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.home.pending);
  const globalSales = useSelector((state) => state.home.globalSales);
  const bulkOrders = useSelector((state) => state.home.bulkOrders);
  const direccion = useSelector((state) => state.home.user.directions);
  const resPutOrder = useSelector((state) => state.home.resPutOrder);
  const resDelete = useSelector((state) => state.home.deleted);
  const location = useLocation();
  const [data, setData] = useState('');
  const [productsWithSales, setProductsWithSales] = useState([]);

  useEffect(() => {
    dispatch(getProducts('?limit=1'));
    dispatch(getOrder({ status: 'pending' }));
    dispatch(getBulkOrders({ status: 'pending' }));
  }, [resDelete, location.search]);

  useEffect(() => {
    let item = [];
    if (product && product.length > 0) {
      let productsDiscounted = product
        ? product
            .map((e) => {
              const productSales = e.sales;
              var categorySales = [];
              if (e.categories && e.categories.length) {
                for (const category of e.categories) {
                  if (category.sales && category.sales.length > 0) {
                    categorySales.push(category.sales);
                  }
                }
                categorySales = categorySales.flat();
              }
              const date = Date();
              const days = [];
              if (productSales && productSales.length > 0) {
                for (const sale of productSales) {
                  if (
                    sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() ||
                    sale.day == 'all'
                  ) {
                    days.push(sale);
                  }
                }
              }
              if (categorySales.length > 0) {
                for (const sale of categorySales) {
                  if (
                    sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() ||
                    sale.day == 'all'
                  ) {
                    days.push(sale);
                  }
                }
              }
              if (globalSales.length > 0) {
                for (const sale of globalSales) {
                  if (
                    sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() ||
                    sale.day == 'all'
                  ) {
                    days.push(sale);
                  }
                }
              }
              if (days.length > 0) {
                const sortedDays = days.sort((a, b) => b.percentage - a.percentage);
                var filteredSales = sortedDays.filter((sale) =>
                  e.orders.amount ? e.orders.amount : 1 > sale.productAmount
                );
              }
              if (filteredSales && filteredSales.length > 0) {
                if (filteredSales[0].amount > 0) {
                  const lastProduct = e;
                  lastProduct.shippingCost = 0;
                  lastProduct.price =
                    e.price - e.price * (filteredSales[0].percentage / 100);
                  e.amount = e.amount - 1;
                  return [e, lastProduct];
                } else {
                  let discountPrice =
                    e.price - e.price * (filteredSales[0].percentage / 100);
                  e.price = discountPrice;
                  return e;
                }
              } else {
                return e;
              }
            })
            .flat()
        : [];
      setProductsWithSales(productsDiscounted);
      item = productsWithSales
        ? productsWithSales.map((e) => {
            return {
              title: e.title,
              amount: e.orders.amount || 1,
              price: e.price,
            };
          })
        : [];
      let res = 0;
      for (const it of productsWithSales) {
        res = res + it.shippingCost;
      }
      let shippingCost = { title: 'shippingCost', amount: 1, price: res };
      item.push(shippingCost);
    }
    console.log(item);
    if ((product && product.length) || (bulkOrders && bulkOrders.length)) {
      const idToken = axios
        .post('/mercadopago/pay', {
          items: item,
          baseURL: window.location.href.slice(0, -9),
        })
        .then((data) => {
          //id
          if (data) {
            setData(data.data);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [product, bulkOrders]);

  return (
    <>
      <NavBarEmpty />
      {productsWithSales && productsWithSales.length > 0 ? <Checkout data={data} products={productsWithSales}/> : <><h1>Loading</h1></>}
      <Footer />
    </>
  );
}
