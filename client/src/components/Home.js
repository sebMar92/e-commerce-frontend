import React from "react";
import NavBar from "./NavBar";
import CarouselPromo from "./CarouselPromo";
import CarouselCateg from "./CarouselCateg";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <CarouselPromo />
      <div className="md:my-32">
        <CarouselCateg />
      </div>

      <Footer />
    </>
  );
}
