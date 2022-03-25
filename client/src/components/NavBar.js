import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./commons/SearchBar";
import DropDown from "./DropDown";
import NightModeButton from "./commons/NightModeButton";
import LoginProfileButton from "./commons/LoginProfileButton";

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Redux/Actions/actions";
import { motion } from "framer-motion";

import DropDownCategories from "./DropDownCategories";
import CartModal from "./commons/CartModal";
import FavsModal from "./commons/FavsModal";

export default function NavBar() {
  const arrayPrueba = ["hola", "hello"];

  const [isOpen, setIsOpen] = useState(true);
  const hidden = "hidden";
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const [isOn, setIsOn] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    document.documentElement.classList.toggle("dark");
  };

  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.home.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="bg-primary-500 font-medium text-lg px-4 py-2">
      <div className="flex flex-row justify-between">
        <div>
          <Link to="/" className="text-decoration-line: no-underline">
            <div className="flex space-x-2 ">
              <img
                src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
                alt="company icon"
                className="flex-none h-10 w-10"
              ></img>
              <h3 className=" text-black no-underline">TechStore</h3>
            </div>
          </Link>
        </div>
{/*         <motion.div layout transition={spring} data-isOn={isOn} onClick={toggleSwitch} className={`bg-primary-700 font-medium rounded-lg text-sm w-20 px-2 py-2 flex cursor-pointer ${isOn && "justify-end"}`}>
          {isOn ? "🌙" : "🌞"}
        </motion.div> */}
        <div className="flex justify-evenly">
        <FavsModal />
        <CartModal />
        <LoginProfileButton />
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 rounded"
            id="menuButton"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="https://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={`bg-primary-500 rounded m-2 w-full sm:hidden lg:flex flex-row justify-evenly z-10 mt-4 ${
            isOpen && hidden
          } `}
        >
          <DropDownCategories tittle="Categories" array={allCategories} />
        </div>
      </div>
    </div>
  );
}
