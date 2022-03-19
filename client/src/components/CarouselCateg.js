import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick"
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../Redux/Actions/actions';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { getCategories, getProducts } from '../Redux/Actions/actions';
import CardHome from './CardHome';

export default function CarouselCateg () {
    const dispatch=useDispatch();
    const allCategories = useSelector((state) => state.home.categories);

    var arr = [];
    for(let i = 0; allCategories.length; i++){
      arr.push({id: i + 1 , name: allCategories[i]})
    }

    useEffect(() => {
        dispatch(getProducts(""));
        dispatch(getCategories());
    }, []);

    function randomCategories(allCategories){
      var categories = [];
      categories = [...allCategories].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,3);
      console.log(categories);
      return categories;
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div className="absolute w-auto top-1/2 transform -translate-y-1/2 cursor-pointer">
          <button className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold" onClick={onClick}><AiOutlineLeft/></button>
        </div>
        
      );
    }

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div className="absolute w-auto top-1/2 transform translate-x-full transform -translate-y-1/2 cursor-pointer">
          <button className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold" onClick={onClick}><AiOutlineRight/></button>
        </div>
      );
    }
    
    

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
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
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      };
      return(
        <div>
          <h1>dgsdg</h1>
        </div>
      )

/*   return(
      <div className="max-w-screen-lg m-auto mt-3 sm:mt-5">
        {randomCategories(allCategories).map(categ => {
          return(
            <div className="font-lora text-center text-xs sm:text-lg md:text-xl lg:text-2xl font-bold">
              <span>{categ.name}</span>
              <Slider {...settings}>
                {currentProduct && currentProduct.filter(product => 
                product.categories[0].name === categ.name).map(product => {
                  return(
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
  );  */
}
<br/>