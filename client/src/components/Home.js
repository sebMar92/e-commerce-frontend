import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import NavBar from "./NavBar";
import CarouselPromo from "./CarouselPromo";
import CarouselCateg from "./CarouselCateg";
import Footer from "./Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import CarruselsHomeCategories from "./CarruselsHomeCategories"
import Carousel from "./InfiniteCarruselHome"
import { carruselThird, clearCarrusel, carruselOne, carruselTwo } from "../Redux/Actions/actions"

export default function Home() {

  const dispatch = useDispatch();

  const firstCarrusel = useSelector((state) => state.home.carruselOne)

  const secondCarrusel = useSelector((state) => state.home.carruselTwo)

  const thirdCarrusel = useSelector((state) => state.home.carruselThird)

  const [carrusels, setCarrusels] = useState([])

  useEffect(() => {
    if (firstCarrusel.length < 1 && secondCarrusel.length < 1 && thirdCarrusel.length < 1) {
      dispatch(carruselOne(`?categoryId=${Math.round(Math.random() * (10 - 1)) + 1}&limit=100`))
      dispatch(carruselTwo(`?categoryId=${Math.round(Math.random() * (10 - 1)) + 1}&limit=100`))
      dispatch(carruselThird(`?categoryId=${Math.round(Math.random() * (10 - 1)) + 1}&limit=100`))
    }
  }, [])

  useEffect(() => {

    if (firstCarrusel && secondCarrusel && thirdCarrusel) {
      setCarrusels([
        ...firstCarrusel, ...secondCarrusel, thirdCarrusel
      ])

    }

  }, [firstCarrusel, secondCarrusel, thirdCarrusel])



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
