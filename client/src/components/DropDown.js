import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DropDown({ tittle, array }) {
  const [isOpen, setIsOpen] = useState(true);
  const hidden = "hidden";
  return (
    <div className="">
      <button
        class="bg-primary-300 font-medium rounded-lg 	text-align: center text-sm w-11/12 px-2 py-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div class="flex justify-between 	text-align: center;">
          <div>
            <h4></h4>
          </div>
          <h5>{tittle}</h5>

          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </button>
      <div
        class={`bg-secondary-100 flex flex-col rounded ${isOpen && hidden} `}
      >
        {array.map((i) => (
          <Link
            to={`/${tittle}/${i}`}
            class="px-2 py-1 hover:bg-primary-300 rounded text-decoration-line: no-underline text-black"
          >
            {i}
          </Link>
        ))}
      </div>
    </div>
  );
}
