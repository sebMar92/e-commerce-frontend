import React, { useState } from "react";

import Product from "./utils/Notebook-Odyssey-2.jpg";

export default function CardCart({ image, name, price, shippingCost, stock }) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(price);


 
  
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
        <div className="flex flex-row-reverse">
          <button className=" text-black items-center  m-2 px-1 rounded-md font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] hover:text-[#fff]  shadow-lg shadow-primary-200/80">
            x
          </button>
        </div>
        <div>
          <div className=" flex flex-wrap justify-between   rounded-lg w-11/12 h-auto">
            <div className=" flex flex-wrap">
              <img
                className="h-28 m-3 rounded-t-lg"
                src={image}
                alt="product image"
              />

              <div>
                <h5 className="text-2xl">Laptop{name}</h5>
                <div>
                  {shippingCost == 0 ? (
                    <div>
                      <p className="text-xs text-blue-900 m-3">Free shipping</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-blue-900 m-3">
                        {shippingCost}
                      </p>
                    </div>
                  )}

                  <button className="bg-[#3b82f6] text-white p-1 rounded-md text-xs font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <br />
                <div>
                  <button
                    className="justify-end bg-[#3b82f6] text-white px-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1"
                    onClick={() => {
                      if (count === 0) return setCount(0);
                      setCount(count - 1);
                    }}
                  >
                    -
                  </button>
                  <span className="mx-5">{count}</span>
                  <button
                    className="bg-[#3b82f6] text-white px-2 rounded-md text-xl font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 mx-2 m-1"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    +
                  </button>
                  {(count!==1) ? setValue(value*count) : value}  
                  <span className="text-1xl font-bold text-gray-900 mx-5">
                    $ {value}
                  </span>
                  <p className="text-xs text-gray-400 text-center mr-24">
                    stock{stock}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
