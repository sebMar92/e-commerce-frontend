import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardCart from './CardCart';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdRestaurantMenu } from 'react-icons/md';
import { getOrder, changeOrderStatus, postBulkOrder } from '../Redux/Actions/actions';
import carrito from './utils/carrito triste.png';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.home.inCart);
  const userInfo = useSelector((state) => state.home.user);
  const direccion = userInfo.directions;
  var total = 0;
  var finalShippingCost = [];

  const resPutOrder = useSelector((state) => state.home.resPutOrder);
  const resPostBulk = useSelector((state) => state.home.resPostBulk);
  console.log(resPostBulk);
  if (product && product.length > 0) {
    total = product
      .map((item) => item.price * item.orders[0].amount)
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(2);
  }
  if (product && product.length > 0) {
    finalShippingCost = product.map((item) => item.shippingCost);
  }

  useEffect(() => {
    dispatch(getOrder({ status: 'inCart' }));
  }, [resPutOrder, resPostBulk]);

  function handleAllBuy() {
    if (product.length > 1) {
      const ids = product.map((e) => e.orders[0].id);
      dispatch(postBulkOrder({ orderIds: ids }));
    } else {
      dispatch(
        changeOrderStatus({
          id: product[0].orders[0].id,
          status: 'pending',
        })
      );
    }
    setTimeout(() => {
      navigate('/purchase');
    }, 1000);
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
                    Shipping Cost ${Math.max(...finalShippingCost).toFixed(2)}
                  </h5>
                </div>
                <div className="flex justify-end mx-8 my-2">
                  {product && product.length > 0 ? (
                    <div>
                      {' '}
                      <h1 className="text-1xl  text-gray-900">Total ${total}</h1>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="mx-5">
                  <h1>Shipment</h1>
                  <span>Direction: </span>

                  <select
                    id="direction"
                    className="bg-[#3b82f6] text-white p-1 m-2 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition"
                  >
                    {direccion &&
                      direccion.map((dir) => {
                        return (
                          <option>
                            {dir.city + ', ' + dir.street + ' ' + dir.streetNumber}
                          </option>
                        );
                      })}
                  </select>
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
        </>
      ) : (
        <div className="flex justify-center">
          {' '}
          <img className="w-36 mx-10 m-10 animate-bounce" src={carrito} alt="" />{' '}
        </div>
      )}
      <Footer />
    </div>
  );
}
