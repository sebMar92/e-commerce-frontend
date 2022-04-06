import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  getUserInfo,
  deleteOrder,
} from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";

export default function CartModal() {
  const order = useSelector((state) => state.home.inCart);
  const render = useSelector((state) => state.home.postOrders);
  const deleted = useSelector((state) => state.home.deleted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder({ status: "inCart" }));
  }, [render, deleted]);

  const deleteCartModal = (del, id) => dispatch(deleteOrder(del, id, "inCart"));

  const notifyDeleteCart = () => {
    toast.error("Deleted from cart!", {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: "success2",
    });
  };

  return (
    <div>
      <div className="group">
        <button className="relative p-2 group bg-primary-700 rounded flex items-center justify-center">
          <Link to="/cart" className="no-underline text-black">
            <AiOutlineShoppingCart
              className="md:text-4xl text-2xl active:scale-120"
              color="#FFffff"
            />
          </Link>
          {order && order.length > 0 && (
            <ul
              className={`absolute absolute top-0 right-0 translate-y-12 mt-1 text-sm invisible shadow-md group-hover:visible p-4 rounded-xl ${
                order && order.length > 0 ? "bg-white" : ""
              }`}
            >
              <p
                className={`text-xl mb-2 pb-2 font-bold ${
                  order && order.length > 0 ? "" : "text-transparent"
                }`}
              >
                Shopping Cart
              </p>
              {order &&
                order.length > 0 &&
                order.map((e, i) => {
                  const del = e.orders && e.orders[0].id;
                  const id = e.productId;
                  if (i < 2) {
                    return (
                      <div
                        key={e.id}
                        className="border-t-[1px] border-primary-700"
                      >
                        <Link
                          to="/cart"
                          key={e.id}
                          className="no-underline text-black"
                        >
                          <li className="grid grid-cols-2 items-center gap-2 bg-white w-52 mt-2 max-h-fit">
                            <p>{e.title}</p>
                            <img
                              className="h-20 object-cover"
                              src={
                                e.images &&
                                e.images.length > 0 &&
                                e.images[0].url
                              }
                              alt={e.id}
                            />
                          </li>
                        </Link>
                        <div className="flex justify-evenly p-2 ">
                          <button
                            onClick={() => {
                              deleteCartModal(del, id, "inCart");
                              notifyDeleteCart();
                            }}
                            className="text-red-600 font-bold px-2 my-1 rounded-lg active:translate-y-1 hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>
                          <Link
                            to="/cart"
                            className="no-underline text-black bg-primary-500 rounded-md px-2 py-2 my-1 active:translate-y-1 font-medium hover:bg-slate-700 hover:text-white"
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
                  className="flex justify-center mt-2 border-[1px] border-primary-700 rounded p-2 no-underline decoration-primary-700 hover:scale-105 text-black invisible group-hover:visible w-12/12 hover:bg-slate-700 hover:text-white hover:rounded"
                >
                  View full cart
                </Link>
              ) : null}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
}
