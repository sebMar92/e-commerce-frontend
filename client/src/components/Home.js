import React from "react";
import NavBar from "./NavBar";
import CarouselPromo from "./CarouselPromo";
import CarouselCateg from "./CarouselCateg";
import Footer from "./Footer/Footer";
import { UploadingImages } from "./commons/UploadingImages";

export default function Home() {
  return (
    <>
      <NavBar />
      <UploadingImages />
      <CarouselPromo />
      <div className="md:my-32">
        <CarouselCateg />
      </div>

      <Footer />
    </>
  );
}
