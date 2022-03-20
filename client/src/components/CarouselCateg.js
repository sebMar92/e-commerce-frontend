import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories } from "../Redux/Actions/actions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardHome from "./CardHome";

export default function CarouselCateg() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.home.products); //Accedemos a la parte del estado del reducer en particular
  const allCategories = useSelector((state) => state.home.categories);

  let arr = [];
  for (let i = 0; i < allCategories.length; i++) {
    arr.push({ id: i + 1, name: allCategories[i] });
  }

  useEffect(() => {
    dispatch(getProducts("?limit=100"));
    dispatch(getCategories());
  }, []);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="flex flex-start top-1/2 cursor-pointer">
        <button
          className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold"
          onClick={onClick}
        >
          <AiOutlineLeft />
        </button>
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="flex flex-start top-1/2 cursor-pointer">
        <button
          className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold"
          onClick={onClick}
        >
          <AiOutlineRight />
        </button>
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  function randomCategories(array) {
    var categories = [];
    categories = [...array]
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 3);

    return categories;
  }

  function prod(allProducts, categ) {
    if (allProducts) {
      let b = [];
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < allProducts[i].categories.length; j++) {
          if (allProducts[i].categories[j].id === categ.id) {
            b.push(allProducts[i]);
          }
        }
      }
      return b;
    }
  }
  return (
    <div className="max-w-screen-lg m-auto mt-3 sm:mt-5">
      {randomCategories(arr).map((categ) => {
        return (
          <div className="font-lora text-center text-xs sm:text-lg md:text-xl lg:text-2xl font-bold ">
            <h1 className="my-16">{categ.name}</h1>
            <Slider {...settings}>
              {prod(allProducts, categ).map((product) => {
                return (
                  <div>
                    <CardHome
                      key={product.id}
                      id={product.id}
                      image={product.images[0].url}
                      title={product.title}
                      price={product.price}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        );
      })}
    </div>
  );
}
<br />;
