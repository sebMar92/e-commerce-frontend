import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./commons/SearchBar";
import DropDown from "./DropDown";
import NightModeButton from "./commons/NightModeButton";
import LoginProfileButton from "./commons/LoginProfileButton";
import {AiOutlineMenu, AiOutlineShopping} from "react-icons/ai"

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Redux/Actions/actions";
import { motion } from "framer-motion";

import DropDownCategories from "./DropDownCategories";
import CartModal from "./commons/CartModal";
import FavsModal from "./commons/FavsModal";
import ButtonAdmin from "./commons/ButtonAdmin";

export default function NavBar() {
  const arrayPrueba = ["hola", "hello"];

  const [isOpen, setIsOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const admin = useSelector((state) => state.home.user);
  const hidden = "hidden";
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const token = window.localStorage.getItem("access")

  const [isOn, setIsOn] = useState(false);
  const [dark, setDark] = useState(false);

  // const toggleSwitch = () => {
  //   setIsOn(!isOn);
  //   document.documentElement.classList.toggle("dark");
  // };

  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.home.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  /* if (admin.rol === "admin") {
    setIsLog(!isLog);
  } */

  return (
    // <div className="bg-primary-700 font-medium text-lg p-4 sticky top-0 shadow-lg">
    //   <div className="flex flex-row justify-between">
    //     <div>
          //  <Link to="/" className="text-decoration-line: no-underline">
          //    <div className="flex space-x-2 ">
          //      <img
          //        src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
          //        alt="company icon"
          //       className="flex-none h-10 w-10"
          //      ></img>
          //      <h3 className=" text-black no-underline">TechStore</h3>
          //    </div>
          //  </Link>
    //     </div>

    //     <div className="flex justify-evenly gap-6">
    //     <FavsModal />
    //     <CartModal />
    //     <LoginProfileButton />
    //     </div>
    //     <div className="block lg:hidden">
    //       <button
    //         className="flex items-center px-3 py-2 rounded"
    //         id="menuButton"
    //         onClick={() => setIsOpen(!isOpen)}
    //       >
    //         <svg
    //           className="fill-current h-3 w-3"
    //           viewBox="0 0 20 20"
    //           xmlns="https://www.w3.org/2000/svg"
    //         >
    //           <title>Menu</title>
    //           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
    //         </svg>
    //       </button>
    //     </div>
    //   </div>

    //   <div>
    //     <div>
    //       <SearchBar />
    //     </div>
    //   </div>
    //   <div className="flex justify-center">
    //     <div
    //       className={`bg-white rounded m-2 w-full sm:hidden lg:flex flex-row justify-evenly z-10 mt-4 ${
    //         isOpen && hidden
    //       } `}
    //     >
    //       <LoginProfileButton />
    //       <CartModal />
    //       <FavsModal />
    //       <DropDownCategories tittle="Categories" array={allCategories} />
    //       <Link to="/historial" className="bg-primary-800 font-medium rounded-lg shadow-lg no-underline text-black text-center text-sm px-2 py-2">Historial</Link>
    //     </div>
    //   </div>
    // </div>
    <div id="main container" className="sticky top-0 z-10">

      <div id="main search" className="flex shadow-md p-2 gap-2 items-center justify-between bg-primary-700 border-b-[1px] border-primary-700">
        
        <div className="hidden md:flex items-center justify-between w-[70%]">
        <div id="logo" className="w-[15%] md:w-[25%] flex justify-between items-center">
          <Link to="/" className="text-decoration-line: no-underline">
             <div className="flex items-center gap-2">
               <img
                 src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
                 alt="company icon"
                className="h-10 w-10"
               ></img>
               <h3 className="text-black font-bold no-underline font-lora hidden md:inline-block">TechStore</h3>
             </div>
           </Link>
        </div>
          <div className="hidden md:flex w-[25%]">
            <DropDownCategories tittle="Categories" array={allCategories} />
           </div>
        <SearchBar />
        </div>
        <div id="logo" className="w-[15%] md:w-[25%] flex justify-between items-center md:hidden">
          <Link to="/" className="text-decoration-line: no-underline">
             <div className="flex items-center gap-2">
               <img
                 src="https://img.icons8.com/external-filled-outline-icons-maxicons/344/external-tech-future-of-technology-filled-outline-icons-maxicons.png"
                 alt="company icon"
                className="h-10 w-10"
               ></img>
               <h3 className="text-black no-underline font-lora hidden md:inline-block">TechStore</h3>
             </div>
           </Link>
        </div>
        <div className="md:hidden w-full">
          <SearchBar />
        </div>
        <div className="hidden md:flex w-[30%] justify-end items-center gap-3">
        {admin.rol != "admin" && <FavsModal/>}
        {admin.rol != "admin" && <CartModal/>}
        {
          token && admin.rol != "admin" && <div className="flex items-center justify-center rounded bg-primary-700">
            <Link to="/purchases" className="text-decoration-line: no-underline p-2">  
              <AiOutlineShopping className="md:text-4xl text-2xl" color="#ffffff"/>
            </Link>
          </div>
        }
        {admin.rol === "admin" && <ButtonAdmin />}
        <LoginProfileButton/>
        </div>
        <div id="boton desplegable" className="w-[15%] flex items-center justify-center md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={(isOpen ? "shadow-md " : "") + "rounded p-2 bg-white"}>
            <AiOutlineMenu color="#FFA438"/>
          </button>
        </div>
      </div>

      <div id="desplegable" className={(isOpen ? "" : "hidden ") + "bg-white flex flex-col items-center justify-center"}>
        <div className="flex justify-around items-center w-full p-2">
          {admin.rol != "admin" && <FavsModal/>}
          {admin.rol != "admin" && <CartModal/>}
          {
            token && admin.rol != "admin" && <div className="flex bg-primary-700 items-center justify-center rounded bg-white">
              <Link to="/purchases" className="text-decoration-line: no-underline p-2">  
                <AiOutlineShopping className="md:text-4xl text-2xl" color="#ffffff"/>
              </Link>
            </div>
          }
          <DropDownCategories tittle="Categories" array={allCategories} />
          {admin.rol === "admin" && <ButtonAdmin />}
          <LoginProfileButton/>
        </div>
      </div>
    </div>
  );
}
