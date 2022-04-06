import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./commons/SearchBar";
import DropDown from "./DropDown";
import NightModeButton from "./commons/NightModeButton";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Redux/Actions/actions";
import { motion } from "framer-motion";

export default function NavBarEmpty() {
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

  return (
    <div className="bg-primary-700 font-medium text-lg px-4 py-2 dark:bg-slate-900">
      <div className="flex flex-row justify-between">
        <div className="select-none">
          <Link to="/" className="no-underline">
            <div className="flex space-x-2 items-center">
              <img
                src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
                alt="company icon"
                className="flex-none h-10 w-10"
              ></img>
              <h3 className=" text-black font-lora font-bold no-underline dark:text-white">
                TechStore
              </h3>
            </div>
          </Link>
        </div>
        <motion.div
          layout
          transition={spring}
          onChange={isOn}
          onClick={toggleSwitch}
          className={`dark:bg-slate-800 bg-primary-300 font-medium rounded-lg text-sm w-20 px-2 py-2 flex cursor-pointer select-none ${
            isOn && "justify-end"
          }`}
        >
          {isOn ? "🌙" : "🔆"}
        </motion.div>
      </div>
    </div>
  );
}
