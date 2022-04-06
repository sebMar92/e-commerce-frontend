import React, { useState } from 'react';
import Slider from 'react-slick';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  getCategories,
  getOrder,
  carruselOne,
  carruselTwo,
  carruselThird,
} from '../Redux/Actions/actions';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import CardHome from './CardHome';
import { Link } from 'react-router-dom';

export default function CarouselCateg({ onClick, onClick2 }) {
  const dispatch = useDispatch();
  const wishListDB = useSelector((state) => state.home.inWishList);
  const cartDB = useSelector((state) => state.home.inCart);
  const token = window.localStorage.getItem('access');
  const deleted = useSelector((state) => state.home.deleted);
  const postOrders = useSelector((state) => state.home.postOrders);

  /* fix */
  const firstCarrusel = useSelector((state) => state.home.carruselOne);

  const secondCarrusel = useSelector((state) => state.home.carruselTwo);

  const thirdCarrusel = useSelector((state) => state.home.carruselThird);

  const categories = useSelector((state) => state.home.categories);

  const [carrusels, setCarrusels] = useState([]);

  function getIdsCategoriesRandoms(array) {
    const categoryLength = categories.length ? categories.length : 16;
    let random = Math.round(Math.random() * (categoryLength - 1)) + 1;
    while (array.includes(random)) {
      random = Math.round(Math.random() * (categoryLength - 1)) + 1;
    }
    return random;
  }

  let categoriesIdsRandoms = [];

  useEffect(() => {
    dispatch(getProducts('?limit=100'));
    dispatch(getCategories());
    dispatch(getOrder({ status: 'inCart' }));
    dispatch(getOrder({ status: 'inWishList' }));

    if (
      firstCarrusel.length < 1 &&
      secondCarrusel.length < 1 &&
      thirdCarrusel.length < 1
    ) {
      while (categoriesIdsRandoms.length < 3) {
        const random = getIdsCategoriesRandoms(categoriesIdsRandoms);
        categoriesIdsRandoms.push(random);
      }

      if (categoriesIdsRandoms.length === 3) {
        console.log('Ids randoms', categoriesIdsRandoms);
        dispatch(carruselOne(`?categoryId=${categoriesIdsRandoms[0]}&limit=100`));
        dispatch(carruselTwo(`?categoryId=${categoriesIdsRandoms[1]}&limit=100`));
        dispatch(carruselThird(`?categoryId=${categoriesIdsRandoms[2]}&limit=100`));
      }
    }
  }, []);

  useEffect(() => {
    if (
      (firstCarrusel && firstCarrusel.length > 1 && firstCarrusel.length < 5) ||
      new Set(categoriesIdsRandoms).size !== categoriesIdsRandoms.length
    ) {
      categoriesIdsRandoms[0] = getIdsCategoriesRandoms(categoriesIdsRandoms);
      dispatch(carruselOne(`?categoryId=${categoriesIdsRandoms[0]}&limit=100`));
    }
    if (
      (secondCarrusel && secondCarrusel.length > 1 && secondCarrusel.length < 5) ||
      new Set(categoriesIdsRandoms).size !== categoriesIdsRandoms.length
    ) {
      categoriesIdsRandoms[1] = getIdsCategoriesRandoms(categoriesIdsRandoms);
      dispatch(carruselTwo(`?categoryId=${categoriesIdsRandoms[1]}&limit=100`));
    }
    if (
      (thirdCarrusel && thirdCarrusel.length > 1 && thirdCarrusel.length < 5) ||
      new Set(categoriesIdsRandoms).size !== categoriesIdsRandoms.length
    ) {
      categoriesIdsRandoms[2] = getIdsCategoriesRandoms(categoriesIdsRandoms);
      dispatch(carruselThird(`?categoryId=${categoriesIdsRandoms[2]}&limit=100`));
    }

    var aux = [];
    if (
      firstCarrusel &&
      firstCarrusel.length &&
      firstCarrusel.length > 4 &&
      secondCarrusel &&
      secondCarrusel.length &&
      secondCarrusel.length > 4 &&
      thirdCarrusel &&
      thirdCarrusel.length &&
      thirdCarrusel.length > 4
    ) {
      aux = [firstCarrusel, secondCarrusel, thirdCarrusel];
      setCarrusels([...new Set(aux)]);
    }
  }, [firstCarrusel, secondCarrusel, thirdCarrusel]);

  /* fix */

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="flex flex-start top-1/2 cursor-pointer">
        <button
          className="mr-5 hidden lg:block absolute hover:scale-110 text-orange-400 p-1.5 rounded-full bg-opacity-30 hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold top-1/2 cursor-pointer text-center right-full active:-translate-x-1"
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
          className="ml-5 hidden lg:block absolute text-orange-400  p-1.5 rounded-full bg-opacity-30 hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold top-1/2 cursor-pointer text-center  left-full right-4 hover:scale-110 active:translate-x-1"
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

  return (
    <div className="max-w-screen-lg m-auto mt-3 sm:mt-5 h-full">
      {carrusels &&
        carrusels.length > 0 &&
        carrusels.map((carr, index) => {
          return (
            <div
              key={index}
              className="m-20 mt-40 font-lora text-xs sm:text-lg md:text-xl lg:text-2xl font-bold"
            >
              <Link
                to={`/products?categoryId=${carr[0].categories[0].id}`}
                className="no-underline text-slate-700   "
              >
                <div className="text-center bg-primary-700 rounded-lg p-2 hover:bg-primary-500">
                  <h1>{carr[0].categories[0].name} </h1>
                </div>
              </Link>

              <Slider {...settings}>
                {carr.map((product) => {
                  return (
                    <div key={product.id} className="p-2 h-full">
                      <CardHome
                        key={product.id}
                        id={product.id}
                        image={product.images[0].url}
                        images={product.images}
                        title={product.title}
                        price={product.price}
                        shippingCost={product.shippingCost}
                        stock={product.stock}
                        description={product.description}
                        wishListDB={wishListDB}
                        cartDB={cartDB}
                        token={token}
                        deleted={deleted}
                        postOrders={postOrders}
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
