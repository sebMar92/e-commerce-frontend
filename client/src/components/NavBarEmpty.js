import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./commons/SearchBar";
import DropDown from "./DropDown";
import NightModeButton from "./commons/NightModeButton";
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../Redux/Actions/actions";



export default function NavBarEmpty(){
  return (
    <div class="bg-primary-500 font-medium text-lg px-4 py-2">
    <div className="flex flex-row justify-between">
      <div>
        <Link to="/">
          <div class="flex space-x-2 no-underline">
            <img
              src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
              alt="company icon"
              class="flex-none h-10 w-10"
            ></img>
            <h3 class=" text-black no-underline">
              Company Name
            </h3>
          </div>
        </Link>
      </div>
      <NightModeButton />
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 rounded"
          id="menuButton"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="https://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}
