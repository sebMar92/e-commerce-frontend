import React from "react";
import Slider from "./ProductDetails/Slider";
import Modelo from "./utils/modelo.jpg";
import ButtonBuy from '../components/commons/ButtonBuy';
import { AiOutlineCheckCircle, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { FaBan } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';

export default function AdminPreview({ input }) {
    const desc = input.description && input.description.split(".");
    const description2 = desc && desc.slice(0, -1);

    return (
        <div className="sm:hidden lg:flex z-10 hidden w-full">

            <div className="flex flex-col w-full">
                {/* Categorias */}
                <div id="category_container" className="pt-2 flex gap-2 mx-8">
                    {input.categories &&
                        input.categories.map((el) => (
                            <div className="w-fit h-fit p-2 bg-white rounded shadow-sm text-xs 2xl:text-sm">
                                {el.name}
                            </div>
                        ))}
                </div>
                {/* Categorias */}


                <div className="w-full p-2 mx-6 my-2 ">

                    {/* IMAGEN */}

                    <div className="bg-white rounded shadow-sm ">
                        <div className="p-2 border-b-[1px] border-b-primary-300 font-lora">
                            <h2 className="2xl:text-2xl">{input.title}</h2>
                        </div>
                        <div className="w-full sm:hidden lg:flex z-10 hidden">
                            {input.images && input.images.length > 0 ? (
                                <div className="w-full">
                                    <Slider images={input.images.flat()} />
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <img className=" w-8/12" src={Modelo} alt="" />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* IMAGEN */}

                    <div className="bg-white rounded shadow-sm ">
                        <div className="flex justify-between w-11/12 m-8 p-2">

                            {/* Price */}
                            <div className="flex gap-2 text-2xl items-center w-4/5 text-bold text-primary-700">
                                <span className="pb-2 border-b-[1px] border-primary-400">
                                    U$S {input.price}
                                </span>
                            </div>
                            {/* Price */}

                            {/* PRECIO ENVIO */}
                            <div className="flex gap-2 text-xl items-center w-full justify-center">
                                <MdLocalShipping className="h-6 w-6" color="#FEBD70" />
                                <span>u$s {input.shippingCost}</span>
                            </div>
                            {/* PRECIO ENVIO */}

                            {/* STOCK */}
                            {input && input.stock > 1 ? (
                                <div className="flex gap-2 text-xl items-center w-full justify-center">
                                    <AiOutlineCheckCircle className="h-6 w-6" color="#FEBD70" />
                                    <span>Stock: {input.stock}</span>
                                </div>
                            ) : (
                                <div className="flex gap-2 text-xl items-center w-full justify-center">
                                    <FaBan className="h-6 w-6 " color="red" />
                                    <span>No stock available</span>
                                </div>
                            )}
                            {/* STOCK */}

                            {/* WISHLIST */}
                            <div className="h-fit p-2 flex">
                                <button
                                    className="flex items-center justify-center gap-2 rounded no-underline h-fit w-12 font-bold p-2 text-primary-400 bg-white border-[1px] border-primary-400 font-lora hover:border-primary-700 focus:border-primary-700 hover:text-primary-700 focus:text-primary-700 hover:shadow-md active:scale-95"
                                >
                                    <AiOutlineHeart className="h-6 w-6" color="#FEBD70" />
                                </button>
                            </div>
                            {/* WISHLIST */}

                            {/* CART */}
                            <div className="h-fit p-2 flex">
                                <button
                                    className="flex items-center justify-center gap-2 rounded no-underline h-fit w-12 font-bold p-2 text-white bg-primary-400 font-lora hover:bg-primary-700 focus:bg-primary-700 hover:shadow-md active:scale-95"
                                >
                                    <AiOutlineShoppingCart className="h-6 w-6" color="#ffffff" />
                                </button>
                            </div>
                            {/* CART */}

                            {/* button buy */}
                            <div className="h-fit p-2 flex">
                                <ButtonBuy
                                    text={'Buy'}
                                />
                            </div>
                            {/* button buy */}
                        </div>
                    </div>


                    {/* <div className="flex justify-center">
                        <div className=" p-2 border-[1px] border-primary-300 rounded flex flex-col items-center w-1/2">
                            <h2 className="pb-2 border-b-[1px] border-b-primary-300 font-lora">
                                Description
                            </h2>
                            <div className="text-sm pt-2">
                                {desc &&
                                    desc.map((el) => {
                                        return description2.indexOf(el) % 2 === 0 ? (
                                            <div className="p-2 bg-primary-200 rounded">
                                                <p>{el}</p>
                                            </div>
                                        ) : (
                                            <div className="p-2 rounded">
                                                <p>{el}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div> */}

                    <div
                        id="description_container"
                        className="p-2 full bg-white rounded flex flex-col "
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
    )
}