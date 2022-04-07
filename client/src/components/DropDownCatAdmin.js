import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";
import { category } from "../Redux/Actions/actions";

export default function DropDownCategories({ tittle, array }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="group ">
      <button className="bg-secondary-100 font-medium rounded-lg text-center text-sm w-11/12 p-2">
        <div className="flex justify-between text-center">
          <div>
            <h4></h4>
          </div>
          <h5>{tittle}</h5>

          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
      <div
        className={`bg-white shadow-md font-lora flex-col overflow-y-auto max-h-56 overflow-x-auto rounded absolute hidden group-hover:block z-10 `}
      >
        {array.map((cat) => {
          return (
            <div
              key={cat.id}
              id={cat.id}
              onClick={(e) => {
                navigate({
                  pathname: "/products",
                  search: createSearchParams({
                    categoryId: e.target.id,
                    offset: "1",
                  }).toString(),
                });
              }}
              className="px-2 py-1 hover:bg-primary-300 rounded no-underline text-black cursor-pointer"
            >
              {cat.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
