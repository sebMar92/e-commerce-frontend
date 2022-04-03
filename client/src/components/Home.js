import React,{useEffect,useState} from "react";
import NavBar from "./NavBar";
import CarouselPromo from "./CarouselPromo";
import CarouselCateg from "./CarouselCateg";
import Footer from "./Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import {useSearchParams,useLocation} from 'react-router-dom'

export default function Home() {
  const notify = () => {
    toast.success("Added to the wishlist !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const notify2 = () => {
    toast.success("Added to the cart !", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };
  

  return (
    <>
      <ToastContainer autoClose={2000} />
      <NavBar />
      <CarouselPromo />
      <div className="md:my-32">
        <CarouselCateg onClick={notify} onClick2={notify2} />
      </div>

      <Footer />
    </>
  );
}
