import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function CardHistorial({
  images,
  title,
  price,
  amount,
  id
  }) 
  {
  return (
    <motion.div className="flex flex-wrap justify-center">
      <div className="bg-secondary-100 w-9/12 m-5 rounded-md">
        <div>
          <div className=" flex flex-wrap justify-between   rounded-lg w-11/12 h-auto">
            <Link
              to={`/product/${id}`}
              className="text-inherit no-underline"
            >
              <div className=" flex flex-wrap justify-center">
                <div className=" flex justify-center w-40">
                  <img
                    className=" items-center max-h-28 p-2  m-3 rounded-t-lg"
                    src={images}
                    alt="product image"
                  />
                </div>

                <div>
                  <h5 className="text-lg text-lefth font-thin m-2 ">{title}</h5>
                </div>
              </div>
            </Link>
            <div>
              <div>
                <br />
                <div>
                  <span className="text-1xl font-bold text-gray-900 mx-5">
                    $ {price}
                  </span>
                  <span className="text-1xl font-bold text-gray-900 mx-5">
                    Amount: {amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
