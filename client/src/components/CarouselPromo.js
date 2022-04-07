import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSales } from '../Redux/Actions/actions.js';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { datos } from './dataFake';
import { Link } from 'react-router-dom';

const data = datos;

let count = 0;
let slideInterval;

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sales = useSelector((state) => state.admin.sales);

  /* sales && console.log("sales: " + sales[1].categories[0].id); */
  const dispatch = useDispatch();
  const slideRef = useRef();
  useEffect(() => {
    slider();
    slideRef.current.addEventListener('animationend', removeAnimation);
    slideRef.current.addEventListener('mouseenter', pauseSlider);
    slideRef.current.addEventListener('mouseleave', slider);
    dispatch(getSales());
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
  };

  const handleNextClick = (e) => {
    count = (count + 1) % data.length;
    setCurrentIndex(count);
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };
  function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
  }

  return (
    <div className="w-[65vw] m-auto mt-3 sm:mt-5 shadow-2xl shadow-orange-300">
      <div
        ref={slideRef}
        className="w-full relative select-none shadow-md shadow-slate-600 sm:rounded"
      >
        {sales.length ? (
          sales[currentIndex].products.length ? (
            <Link to={`/product/${sales[currentIndex].products[0].id}`}>
              <div className="aspect-w-9 aspect-h-4">
                <img
                  className="sm:rounded"
                  src={sales.length && sales[currentIndex].image}
                  alt=""
                />
                <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
                  {sales.length && sales[currentIndex].description}
                </span>
              </div>
            </Link>
          ) : sales[currentIndex].categories.length ? (
            sales[currentIndex].categories[0].id !== 0 && (
              <Link
                to={`/products?categoryId=${sales[currentIndex].categories[0].id}&offset=1`}
              >
                <div className="aspect-w-9 aspect-h-4">
                  <img
                    className="sm:rounded"
                    src={sales.length && sales[currentIndex].image}
                    alt=""
                  />
                  <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
                    {sales.length && sales[currentIndex].description}
                  </span>
                </div>
              </Link>
            )
          ) : (
            <Link to={`/products?categoryId=${aleatorio(1, 6)}&offset=1`}>
              <div className="aspect-w-9 aspect-h-4">
                <img
                  className="sm:rounded"
                  src={sales.length && sales[currentIndex].image}
                  alt=""
                />
                <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
                  {sales.length && sales[currentIndex].description}
                </span>
              </div>
            </Link>
          )
        ) : (
          <br />
        )}
        {/* {sales.length && sales[currentIndex].categories.length ? (
          sales[currentIndex].categories[0].id !== 0 ? (
            <Link
              to={`/products?categoryId=${sales[currentIndex].categories[0].id}&offset=1`}
            >
              <div className="aspect-w-9 aspect-h-4">
                <img
                  className="sm:rounded"
                  src={sales.length && sales[currentIndex].image}
                  alt=""
                />
                <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
                  {sales.length && sales[currentIndex].description}
                </span>
              </div>
            </Link>
          ) : (
            <div className="aspect-w-9 aspect-h-4">
              <img
                className="sm:rounded"
                src={sales.length && sales[currentIndex].image}
                alt=""
              />
              <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
                {sales.length && sales[currentIndex].description}
              </span>
            </div>
          )
        ) : (
          <div className="aspect-w-9 aspect-h-4">
            <img
              className="sm:rounded"
              src={sales.length && sales[currentIndex].image}
              alt=""
            />
            <span className="font-lora text-center text-lg  font-bold top-1/2 text-white bg-black bg-opacity-70 h-8 mt-auto mb-6">
              {sales.length && sales[currentIndex].description}
            </span>
          </div>
        )} */}
        <div className="hidden cursor-default absolute w-full top-1/2 transform -translate-y-1/2 md:flex md:justify-between items-start px-3">
          <button
            className="text-primary-800 p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold -translate-x-28 hover:scale-110"
            onClick={handlePreviousClick}
          >
            <AiOutlineLeft />
          </button>
          <button
            className="text-primary-800 p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:scale-110 hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold translate-x-28"
            onClick={handleNextClick}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </div>
  );
}
