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
    <div className="max-w-screen-md m-auto">
      <div ref={slideRef} className="w-full relative select-none">
          <div className="aspect-w-16 aspect-h-9">
            <img src={data[currentIndex].image} alt="" />
            <div className='text-xl max-w-prose text-center top-2/3 text-red-900 '>{data[currentIndex].text}</div>
          </div>

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3 cursor-pointer">
          <button className="bg-black text-white p-1 rounded-full bg-opacity-10 cursor-pointer hover:bg-opacity-60 transition" onClick={handlePreviousClick}><AiOutlineLeft size={60}/></button>
          <button className="bg-black text-white p-1 rounded-full bg-opacity-10 cursor-pointer hover:bg-opacity-60 transition" onClick={handleNextClick}><AiOutlineRight size={60}/></button>
        </div>
      </div>
    </div>
  );
}