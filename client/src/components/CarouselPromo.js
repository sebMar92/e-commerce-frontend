import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { datos } from "./dataFake";

const data = datos;

let count = 0;
let slideInterval;

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();
  useEffect(() => {
    slider();
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", slider);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const slider = () => {
    slideInterval = setInterval(() => {
      handleNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handlePreviousClick = (e) => {
    const productsLength = data.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  const handleNextClick = (e) => {
    count = (count + 1) % data.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  return (
    <div className="max-w-screen-sm m-auto mt-3 sm:mt-5">
      <div ref={slideRef} className="w-full relative select-none shadow-md shadow-slate-600 sm:rounded">
        <div className="aspect-w-9 aspect-h-4">
          <img className="sm:rounded" src={data[currentIndex].image} alt="" />
          {/* <span className="font-lora text-center text-xs sm:text-lg md:text-xl lg:text-2xl font-bold top-1/2 text-orange-500 ">
            {data[currentIndex].text}
          </span> */}
        </div>
        <div className="hidden cursor-default absolute w-full top-1/2 transform -translate-y-1/2 md:flex md:justify-between items-start px-3">
          <button
            className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold -translate-x-28 border-2 border-solid border-primary-500 shadow-lg shadow-slate-400"
            onClick={handlePreviousClick}
          >
            <AiOutlineLeft />
          </button>
          <button
            className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold translate-x-28 border-2 border-solid border-primary-500 shadow-lg shadow-slate-400"
            onClick={handleNextClick}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </div>
  );
}
