import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardHistorial from './CardHistorial';
import { getBulkOrders, getOrder } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import historial from './utils/no-wishlist.svg';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

export default function Historial() {
  const dispatch = useDispatch();
  const bulks = useSelector((state) => state.home.bulkOrders);
  const orders = useSelector((state) => state.home.historial);
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    dispatch(getBulkOrders({ status: 'finished' }));
    dispatch(getOrder({ status: 'pending,finished,preparing,onDelivery' }));
  }, []);

  useEffect(() => {
    if (orders && orders.data.length > 0 && bulks && bulks.length > 0) {
      setProducts([...orders.data]);
    } else {
      if (orders && orders.data.length > 0) {
        setProducts([...orders.data]);
      }
      if (bulks && bulks.length > 0) {
        setProducts([...bulks]);
      }
    }
  }, [orders, bulks]);

  function prettyDate(date) {
    if (date) {
      const splitTime = date.slice(0, 24);
      return splitTime;
    }
  }
  return (
    <>
      <NavBar />
      <div className="historial">
        <h1 className="flex justify-center my-8 text-4xl">Your Purchases</h1>
        <AnimateSharedLayout>
          {products && products.length > 0 ? (
            products.map((prod, i) => {
              if (prod.orders) {
                console.log(prod.orders[0].localPurchaseDate);
                return (
                  <div key={i}>
                    <h1 className="xl:ml-[13rem] underline decoration-primary-700">
                      {' '}
                      {prod && prod.orders
                        ? prettyDate(prod.orders[0].localPurchaseDate)
                        : 'trying to remember'}
                    </h1>
                    ;
                    <CardHistorial
                      key={prod.id}
                      title={prod.title}
                      price={prod.price}
                      amount={prod.orders && prod.orders[0].amount}
                      images={prod.images && prod.images[0].url}
                      id={prod.id}
                    />
                  </div>
                );
              } else {
                console.log(prod.localPurchaseDate);
                return (
                  <div>
                    <h1 className="xl:ml-[13rem] underline decoration-primary-700">
                      {' '}
                      {prod ? prettyDate(prod.localPurchaseDate) : 'trying to remember'}
                    </h1>
                    {prod.products &&
                      prod.products.map((prod, i) => {
                        return (
                          <div key={i}>
                            <CardHistorial
                              key={prod.id}
                              title={prod.title}
                              price={prod.price}
                              images={prod.images && prod.images[0].url}
                              id={prod.id}
                            />
                          </div>
                        );
                      })}
                  </div>
                );
              }
            })
          ) : (
            <div className="flex justify-center m-10 ">
              <div className="justify-center">
                <h1 className="font-serif text-center">You haven't made purchases</h1>
                <br />
                <span className="flex justify-center">
                  <img className="animate-pulse w-4/6" src={historial} />
                </span>
              </div>
            </div>
          )}
        </AnimateSharedLayout>
      </div>
      <Footer />
    </>
  );
}
