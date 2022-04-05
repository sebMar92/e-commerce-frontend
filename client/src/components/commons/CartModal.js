import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getUserInfo, deleteOrder } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { toast } from 'react-toastify';

export default function CartModal() {
  const order = useSelector((state) => state.home.inCart);
  const render = useSelector((state) => state.home.postOrders);
  const deleted = useSelector((state) => state.home.deleted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder({ status: 'inCart' }));
  }, [render, deleted]);

  const deleteCartModal = (del, id) => dispatch(deleteOrder(
    del,
    id,
    "inCart"
  ));

  const notifyDeleteCart = () => {
    toast.error('Deleted from cart!', {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: 'success2',
    });
  };

  return (
    <div>
      <div className="group">
        <button className="px-2 py-2 group">
          <Link to="/cart" className="no-underline text-black">
            <AiOutlineShoppingCart className="text-2xl mt-1 active:scale-120" />
          </Link>
          <ul
            className={`absolute z-50 -translate-x-52 mt-1 text-sm invisible group-hover:visible p-4 rounded-xl ${
              order && order.length > 0 ? 'bg-white' : ''
            }`}
          >
            <p
              className={`text-xl mb-2 font-bold ${
                order && order.length > 0 ? '' : 'text-transparent'
              }`}
            >
              Shopping Cart
            </p>
            {order &&
              order.length > 0 &&
              order.map((e, i) => {
                const del = e.orders && e.orders[0].id;
                const id = e.productId
                if (i < 2) {
                  return (
                    <div key={e.id}>
                      <Link to="/cart" key={e.id} className="no-underline text-black">
                        <li className="grid grid-cols-2 gap-2 bg-white w-52 mt-2 max-h-fit">
                          <p>{e.title}</p>
                          <img
                            className="h-20 object-cover"
                            src={e.images && e.images.length > 0 && e.images[0].url}
                            alt={e.id}
                          />
                        </li>
                      </Link>
                      <div className="flex justify-evenly bg-slate-100">
                        <button
                          onClick={() => {
                            deleteCartModal(del, id, "inCart");
                            notifyDeleteCart();
                          }}
                          className="text-red-600 font-bold px-2 my-1 rounded-lg active:translate-y-1"
                        >
                          Eliminar
                        </button>
                        <Link
                          to="/cart"
                          className="no-underline text-black bg-primary-700 rounded-md px-2 py-2 my-1 active:translate-y-1 font-medium"
                        >
                          Go to buy
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            {order && order.length > 0 ? (
              <Link
                to="/cart"
                className="flex justify-center mt-1 underline decoration-primary-700 hover:scale-105 text-black invisible group-hover:visible w-12/12"
              >
                View full cart
              </Link>
            ) : null}
          </ul>
        </button>
      </div>
    </div>
  );
}
