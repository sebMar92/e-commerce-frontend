import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardHistorial from './CardHistorial';
import { getBulkOrders } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import historial from './utils/no-wishlist.svg';

export default function Historial() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.home.bulkOrders);

  useEffect(() => {
    dispatch(getBulkOrders());
  }, []);
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
        {products && products.length > 0 ? (
          products.map((prod) => {
            if (prod.orders) {
              return (
                <div>
                  <h1>
                    {' '}
                    Purchase date:{' '}
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
              return (
                <div>
                  <h1>
                    {' '}
                    Purchase date:{' '}
                    {prod ? prettyDate(prod.localPurchaseDate) : 'trying to remember'}
                  </h1>
                  {prod.products &&
                    prod.products.map((prod) => {
                      return (
                        <div>
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
                <img className=" animate-pulse   w-4/6" src={historial} />
              </span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
