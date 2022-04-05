import React, { useState } from "react";
import Slider from "react-slick";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories, getOrder, carruselOne, carruselTwo, carruselThird } from "../Redux/Actions/actions";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardHome from "./CardHome";
import { Link } from "react-router-dom";

export default function CarouselCateg({ onClick, onClick2 }) {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.home.products);
  const allCategories = useSelector((state) => state.home.categories);
  const wishListDB = useSelector((state) => state.home.inWishList);
  const cartDB = useSelector((state) => state.home.inCart)
  const token = window.localStorage.getItem("access")
  const deleted = useSelector((state) => state.home.deleted)
  const postOrders = useSelector((state) => state.home.postOrders)


  let arr = [];
  for (let i = 0; i < allCategories.length; i++) {
    arr.push({ id: i + 1, name: allCategories[i].name });
  }


  /* fix */
  const firstCarrusel = useSelector((state) => state.home.carruselOne)

  const secondCarrusel = useSelector((state) => state.home.carruselTwo)

  const thirdCarrusel = useSelector((state) => state.home.carruselThird)

  const categories = useSelector((state) => state.home.categories)


  const [carrusels, setCarrusels] = useState([])


  const categoriesIdsRandoms = [];
  function getIdsCategoriesRandoms() {
    const randoms = Math.round(Math.random() * (10 - 1)) + 1;
    categoriesIdsRandoms.includes(randoms) ? getIdsCategoriesRandoms() : categoriesIdsRandoms.push(randoms);
  }


  useEffect(() => {
    dispatch(getProducts("?limit=100"));
    dispatch(getCategories());
    dispatch(getOrder({ status: "inCart" }))
    dispatch(getOrder({ status: "inWishList" }))

    if (firstCarrusel.length < 1 && secondCarrusel.length < 1 && thirdCarrusel.length < 1) {


      while (categoriesIdsRandoms.length < 3) {
        getIdsCategoriesRandoms()
      }


      if (categoriesIdsRandoms.length === 3) {
        console.log("Ids randoms", categoriesIdsRandoms)
        dispatch(carruselOne(`?categoryId=${categoriesIdsRandoms[0]}&limit=100`))
        dispatch(carruselTwo(`?categoryId=${categoriesIdsRandoms[1]}&limit=100`))
        dispatch(carruselThird(`?categoryId=${categoriesIdsRandoms[2]}&limit=100`))
      }

      if (firstCarrusel.length < 5) {
        dispatch(carruselOne(`?categoryId=${categoriesIdsRandoms[0]}&limit=100`))
      }
      if (secondCarrusel.length < 5) {
        dispatch(carruselTwo(`?categoryId=${categoriesIdsRandoms[1]}&limit=100`))
      }
      if (thirdCarrusel.length < 5) {
        dispatch(carruselThird(`?categoryId=${categoriesIdsRandoms[2]}&limit=100`))
      }
    }
  }, [])

  useEffect(() => {
    var aux = []
    if (firstCarrusel.length && secondCarrusel.length && thirdCarrusel.length) {
      aux.push(firstCarrusel)
      aux.push(secondCarrusel)
      aux.push(thirdCarrusel)
      setCarrusels(aux)
      console.log("carruseles", carrusels)
    }

  }, [firstCarrusel, secondCarrusel, thirdCarrusel])

  /* fix */

  const [categoriesRandoms, setCategoriesRandoms] = useState([])

  useEffect(() => {
    function randomCategories(array) {
      var categories = [];
      categories = [...array].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 3);
      return categories;
    }
    if (allCategories && allCategories.length > 0 && categoriesRandoms.length < 1) {
      setCategoriesRandoms(randomCategories(allCategories));
    }
  }, [allCategories])


  function prod(allProducts, categ) {
    if (allProducts) {
      var b = [];
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < allProducts[i].categories.length; j++) {
          if (allProducts[i].categories[j].id === categ.id) {
            b.push(allProducts[i]);
          }
        }
      }
    }
    return b;

  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className="flex flex-start top-1/2 cursor-pointer">
        <button
          className="border-2 border-solid border-primary-500 shadow-lg shadow-slate-400  mr-5 hidden lg:block absolute bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold top-1/2 cursor-pointer text-center  right-full"
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
          className="border-2 border-solid border-primary-500 shadow-lg shadow-slate-400 ml-5 hidden lg:block absolute bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold top-1/2 cursor-pointer text-center  left-full right-4/"
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
      {categoriesRandoms && categoriesRandoms.length > 0 && categoriesRandoms.map((categ) => {
        return (
          <div
            key={categ.id}
            className="m-20 mt-40 font-lora text-xs sm:text-lg md:text-xl lg:text-2xl font-bold"
          >
            <Link
              to={`/products?categoryId=${categ.id}`}
              className="no-underline text-slate-700   "
            >
              <div className="text-center bg-primary-700 rounded-lg p-2 hover:bg-primary-500">
                <h1>{categ.name} </h1>
              </div>
            </Link>

            <Slider {...settings}>
              {prod(allProducts, categ)?.map((product) => {
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
