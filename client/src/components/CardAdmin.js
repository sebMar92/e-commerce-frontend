import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonDelete from './commons/ButtonDelete';
import ButtonComplete from './commons/ButtonComplete';

export default function CardAdmin({
  images,
  title,
  price,
  id
}) {
   
  return (
    <div className="flex flex-wrap justify-center">
      <div className="bg-secondary-100 w-full m-5 rounded-md hover:scale-105 shadow-sm shadow-secondary-500">
        <div className="flex justify-end">
          <div className=" flex flex-col flex-wrap justify-between   rounded-lg w-full h-auto">
            <Link
              to={`/admin/edit/${id}`}
              className="text-inherit no-underline"
            >
              <div className=" flex flex-row flex-wrap justify-around">
                <div className=" flex justify-start w-40">
                  <img
                    className=" items-center max-h-28 p-2  m-3 rounded-t-lg"
                    src={images}
                    alt="product image"
                  />
                </div>

                <div>
                  <h5 className="text-lg text-lefth font-thin m-2 flex flex-wrap justify-end">{title}</h5>
                </div>
              </div>
            </Link>
            
              <div className="flex flex-row-reverse flex-wrap justify-flex-end pb-2 pr-2">
                <ButtonDelete />
                <Link to={`/admin/edit/${id}`}>
                  <ButtonComplete text={'Edit'} />
                </Link>
                <Link to={`/admin/discounts`} className="no-underline">
                   <ButtonComplete text={'Add Discount'} />
                </Link>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
