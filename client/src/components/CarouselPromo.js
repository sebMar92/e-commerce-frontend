import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { datos } from './dataFake';

const data = datos;

let count = 0;
let slideInterval;

export default function Carousel(){

    const[currentIndex, setCurrentIndex] = useState(0);
    
    const slideRef = useRef();
    useEffect(() => {
      slider();
      slideRef.current.addEventListener("animationend", removeAnimation);
      slideRef.current.addEventListener("mouseenter", pauseSlider);
      slideRef.current.addEventListener("mouseleave", slider);

      return () => {
        clearInterval(slideInterval);
      };
    },[]);

    const slider = () => {
      slideInterval = setInterval(() => {
            handleNextClick();
        }, 15000);
    };

    const pauseSlider = () => {
      clearInterval(slideInterval);
    }

    const handlePreviousClick = (e) => {
        const productsLength =data.length;
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
    <div className="max-w-screen-lg m-auto mt-3 sm:mt-5 ">
      <div ref={slideRef} className="w-full relative select-none">
          <div className="aspect-w-9 aspect-h-4">
            <img className="sm:rounded" src={data[currentIndex].image} alt="" />
            <span className='font-lora text-center text-xs sm:text-lg md:text-xl lg:text-2xl font-bold top-1/2 text-orange-500 '>{data[currentIndex].text}</span>
          </div>
        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3 cursor-pointer">
          <button className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold" onClick={handlePreviousClick}><AiOutlineLeft/></button>
          <button className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold" onClick={handleNextClick}><AiOutlineRight/></button>
        </div>
      </div>
    </div>
  );
}