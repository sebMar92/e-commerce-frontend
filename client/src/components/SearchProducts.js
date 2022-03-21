import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import Card from "./Card";
import FilterAndOrderComponent from "./FilterAndOrden";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

export default function Products() {
  const searchProducts = useSelector((state) => state.home.search.products);

  return (
    <>
      <NavBar />
      <div className="flex flex-col sm:flex-row">
        <FilterAndOrderComponent />
        <div className="products">
          <h1>This is products by category</h1>
          <p></p>
          <div className="sm:flex sm:flex-wrap">
            {searchProducts &&
              searchProducts.map((item) => {
                return (
                  <Card
                    key={item.id}
                    name={item.title}
                    price={item.price}
                    image={item.images[1].url}
                    shippingCost={item.shippingCost}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Pagination />
      <Footer />
    </>
  );
}
