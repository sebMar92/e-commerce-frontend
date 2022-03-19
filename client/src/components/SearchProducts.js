import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import FilterAndOrderComponent from "./FilterAndOrden";
import Pagination from "./Pagination";
import RenderSearch from "./RenderSearch";
var array = [
  { image: "", title: "hola", price: "" },
  { image: "", title: "hola", price: "" },
  { image: "", title: "hola", price: "" },
];
export default function SearchProducts() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row">
        <FilterAndOrderComponent />
        <div className="products">
          <h1>There are all products</h1>
          {/* <RenderSearch array={array} /> */}
        </div>
      </div>
      <Pagination />
      <Footer />
    </>
  );
}
