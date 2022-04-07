import React from 'react';
import Slider from './ProductDetails/Slider';
import Modelo from './utils/modelo.jpg';
import ButtonBuy from '../components/commons/ButtonBuy';
import {
  AiOutlineCheckCircle,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { FaBan } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';

export default function AdminPreview({ input }) {
  const desc = input.description && input.description.split('.');
  const description2 = desc && desc.slice(0, -1);

  return (
    <div className="flex w-full">
      <div className="flex w-full flex-col bg-secondary-100 dark:bg-slate-700">
        {/* Categorias */}
        <div id="category_container" className="pt-2 flex gap-2 mx-8">
          {input.categories &&
            input.categories.map((el) => (
              <div className=" p-2 bg-white rounded shadow-sm text-xs 2xl:text-sm">
                {el.name}
              </div>
            ))}
        </div>
        {/* Categorias */}

        <div className=" p-2 mx-6 my-2 ">
          {/* IMAGEN */}

          <div className="bg-white rounded shadow-sm dark:text-white dark:bg-slate-800">
            <div className="p-2 border-b-[1px] border-b-primary-300 font-lora ">
              <h2 className="2xl:text-2xl">{input.title}</h2>
            </div>
            <div className="w-full lg:flex z-10">
              {input.images && input.images.length > 0 ? (
                <div className="w-full">
                  <Slider images={input.images.flat()} />
                </div>
              ) : (
                <div className="flex justify-center">
                  <img
                    className=" w-8/12"
                    src={
                      'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg'
                    }
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
          {/* IMAGEN */}

          <div className="flex flex-col w-full gap-6 pt-4 font-lora">
            <div className="w-full bg-white dark:bg-slate-800 dark:text-white rounded p-2 flex flex-col gap-3 items-center justify-center lg:flex-row">
              {/* Price */}
              <div className="flex gap-2 text-2xl items-center w-4/5 text-bold text-primary-700">
                <span className="pb-2 border-b-[1px] border-primary-400 ">
                  US$ {input.price}
                </span>
              </div>
              {/* Price */}

              {/* PRECIO ENVIO */}
              <div className="flex gap-2 text-xl items-center w-full justify-center">
                <MdLocalShipping className="h-6 w-6 " color="#FEBD70 " />
                <span>us$ {input.shippingCost}</span>
              </div>
              {/* PRECIO ENVIO */}

              {/* STOCK */}
              {input && input.stock > 1 ? (
                <div className="flex gap-2 text-xl items-center w-full justify-center">
                  <AiOutlineCheckCircle className="h-6 w-6" color="#FEBD70" />
                  <span>Stock: {input.stock}</span>
                </div>
              ) : (
                <div className="flex gap-1 text-xl text-center">
                  <FaBan className="h-6 w-6 " color="red" />
                  <span>No stock available</span>
                </div>
              )}
              {/* STOCK */}

              {/* WISHLIST */}
              <div className="h-auto p-2 flex">
                <button className="flex items-center justify-center gap-2 rounded no-underline h-auto w-12 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md active:scale-95 dark:bg-slate-800 dark:hover:shadow-primary-200">
                  <AiOutlineHeart className="h-6 w-6 " color="#FEBD70" />
                </button>
              </div>
              {/* WISHLIST */}

              {/* CART */}
              <div className="h-auto p-2 flex">
                <button className="flex items-center justify-center gap-2 rounded no-underline h-auto w-12 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700 hover:shadow-md active:scale-95 dark:bg-slate-700 dark:hover:shadow-secondary-100">
                  <AiOutlineShoppingCart className="h-6 w-6 " color="#ffffff" />
                </button>
              </div>
              {/* CART */}

              {/* button buy */}
              <div className="h-auto p-2 flex">
                <ButtonBuy text={'Buy'} />
              </div>
              {/* button buy */}
            </div>
            <div
              id="description_container"
              className="p-2 full bg-white dark:bg-slate-800 dark:text-white rounded flex flex-col "
            >
              <div className="p-2 border-b-[1px] border-primary-300">
                <h2 className="font-lora">Description</h2>
              </div>
              <div className="text-sm pt-2 pl-3 flex flex-col gap-2 pb-4 marker:primary-300">
                {desc &&
                  desc.map((el) => (
                    <div className="flex gap-2 items-center text-base">
                      <GoPrimitiveDot color="#FEBD70" />
                      <span>{el}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
