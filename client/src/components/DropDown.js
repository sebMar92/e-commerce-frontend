import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DropDown({ tittle, array }) {
  const [isOpen, setIsOpen] = useState(true);
  const hidden = "hidden";
  return (
    <div className="">
      <button
        className="bg-primary-300 font-medium rounded-lg text-center text-sm w-11/12 px-2 py-2 cursor-default "
       /*  onClick={() => setIsOpen(!isOpen)} */
      >
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
        className={`bg-secondary-100 flex flex-col rounded absolute ${isOpen && hidden} `}
      >
        {array.map((i) => (
          <Link key={i}
            to={`/${tittle}/${i}`}
            className="px-2 py-1 hover:bg-primary-300 rounded no-underline text-black"
          >
            {i}
          </Link>
        ))}
      </div>
    </div>
  );
}
