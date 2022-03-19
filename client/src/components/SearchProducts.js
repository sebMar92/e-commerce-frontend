import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import FilterAndOrderComponent from "./FilterAndOrden";
import Pagination from "./Pagination";
import CardHome from "./CardHome";
/* var array = [
  { image: "", title: "hola", price: "" },
  { image: "", title: "hola", price: "" },
  { image: "", title: "hola", price: "" },
]; */
export default function SearchProducts() {
  /* console.log(array); */
  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row">
        <FilterAndOrderComponent />
        <div className="products">
          <h1>There are all products</h1>
          {/* {array.map((i) => {
            return <CardHome image={i.image} title={i.title} price={i.price} />;
          })} */}
        </div>
      </div>
      <Pagination />
      <Footer />
    </>
  );
}
