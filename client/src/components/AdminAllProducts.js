import React from "react";
import Footer from "./Footer/Footer";
import NavbarAdmin from "./NavbarAdmin";
import NavBarEmpty from "./NavBarEmpty";
import { useLocation } from "react-router-dom";
import SearchBarAdmin from "./commons/SearchBarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories, getProducts } from "../Redux/Actions/actions";
import DropDownCatAdmin from "./DropDownCatAdmin";
import CardAdmin from "./CardAdmin";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

export default function AdminAllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const allProducts = useSelector((state) => state.home.products);
  const allCategories = useSelector((state) => state.home.categories);
  const deletedProductConfirm = useSelector(
    (state) => state.admin.deletedProduct
  );
  const category = useSelector((state) => state.admin.category);
  console.log(category);
  useEffect(() => {
    dispatch(getProducts(search));
    dispatch(getCategories());
  }, [search, deletedProductConfirm]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts("limit=8&offset=1"));
  }, []);

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row font-lora">
        <NavbarAdmin />
        <div className="m-auto w-full h-full">
          <div className="flex flex-row flex-wrap m-2 ">
            <div className="basis-1/5">
              <DropDownCatAdmin tittle="Categories" array={allCategories} />
            </div>
            <div className="basis-4/5">
              <SearchBarAdmin />
            </div>
          </div>
          <Pagination />
          {category && (
            <div className="w-fit h-fit p-2 ml-2 bg-secondary-100 rounded shadow-sm text-xs 2xl:text-sm">
              <Link
                to={`/products?categoryId=${category.id}&offset=1`}
                className="text-decoration-line: no-underline text-black"
              >
                {category.name}
              </Link>
            </div>
          )}
          {allProducts &&
            allProducts.map((prod) => {
              return (
                <CardAdmin
                  key={prod.id}
                  title={prod.title}
                  price={prod.price}
                  images={prod.images[0].url}
                  id={prod.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
