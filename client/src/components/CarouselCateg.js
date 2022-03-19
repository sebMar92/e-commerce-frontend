import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCategories } from '../Redux/Actions/actions';
import Slider from "react-slick"
import { Link } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardHome from './CardHome';


export default function CarouselCateg () {

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.home.products); //Accedemos a la parte del estado del reducer en particular

    useEffect(() => {
        dispatch(getProducts(""));
        dispatch(getCategories());
    }, []);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style={"width":"400px"}, onClick } = props;
      return (
        <div
          className={className}
          onClick={onClick}
        />
      );
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      

    return(
      <div >
        <Slider {...settings}>
          {allProducts && allProducts.map(product => {
          return(
            <div >
              <CardHome 
                key={product.id}
                id={product.id}
                image={product.images[0].url}
                title={product.title}
                price={product.price}
            />
            </div>
              );
            })
          }
        </Slider>
      </div>
    );
}
<br/>
