import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  getOrder,
  deleteOrder,
  postOrder
} from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

export default function FavsModal() {
  const favs = useSelector((state) => state.home.inWishList);
  const render = useSelector((state) => state.home.postOrders);
  const deleted = useSelector((state) => state.home.deleted);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder({ status: "inWishList" }));
  }, [render, deleted]);

  const deleteFavModal = (del, id) =>
    dispatch(deleteOrder(del, id, "inWishList"));

  const notifyDelete = () => {
    toast.error("Deleted from wishlist!", {
      position: toast.POSITION.BOTTOM_LEFT,
      toastId: "success1",
    });
  };

  const handleAddToCart = (id, title, shippingCost, stock, description, images, price) => {
    dispatch(
      postOrder({
          status: "inCart",
          productId: id,
          amount: 1,
          title: title,
          shippingCost: shippingCost,
          stock: stock,
          description: description,
          images: images,
          price: price,
          id: id
      })
    );
    toast.success('Added to the cart !', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
  

  return (
    <div>
      <div className="group">
        <button className="relative p-2 group bg-primary-700 rounded flex items-center justify-center">
          <Link to="/wishlist" className="no-underline text-black">
            <AiOutlineHeart
              className="md:text-4xl text-2xl hover:scale-120"
              color="#FFffff"
            />
          </Link>
          {favs && favs.length > 0 && (
            <ul
              className={` absolute top-0 right-0 translate-y-12 mt-1 text-sm invisible shadow-md group-hover:visible p-4 rounded-xl ${
                favs && favs.length > 0 ? "bg-white" : ""
              } rounded-xl`}
            >
              <p
                className={`text-xl mb-2 pb-2 font-bold ${
                  favs && favs.length > 0 ? "" : "text-transparent"
                }`}
              >
                Wishlist
              </p>
              {favs &&
                favs.length > 0 &&
                favs.map((e, i) => {
                  const del = e.orders[0].id;
                  const id = e.productId;
                  if (i < 2) {
                    return (
                      <>
                        <div className="border-t-[1px] border-primary-700">
                          <Link
                            to="/wishlist"
                            key={e.id}
                            className="no-underline text-black"
                          >
                            <li className="grid grid-cols-2 items-center gap-2 bg-white w-52 mt-2 max-h-fit">
                              {e.title}
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
                          <div className="flex justify-evenly p-2">
                            <button
                              onClick={() => {
                                deleteFavModal(del, id);
                                notifyDelete();
                              }}
                              className="text-red-600 font-bold px-2 my-1 rounded-lg active:translate-y-1 hover:bg-red-600 hover:text-white"
                            >
                              Delete
                            </button>
                            
                              <button onClick={() => handleAddToCart(e.id, e.title, e.shippingCost, e.stock, e.description, e.images, e.price)} className="no-underline text-black bg-primary-700 rounded-md px-2 py-2 my-1 active:translate-y-1 font-medium hover:bg-slate-700 hover:text-white">
                                Add to cart
                              </button> 
                            
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              {favs && favs.length > 0 ? (
                <Link
                  to="/wishlist"
                  className="flex justify-center mt-2 border-[1px] border-primary-700 rounded p-2 no-underline decoration-primary-700 hover:scale-105 text-black invisible group-hover:visible w-12/12 hover:bg-slate-700 hover:text-white hover:rounded"
                >
                  View full wishlist
                </Link>
              ) : null}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
}
