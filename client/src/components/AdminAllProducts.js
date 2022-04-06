import React from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useLocation } from 'react-router-dom';
import SearchBarAdmin from './commons/SearchBarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCategories, getProducts } from '../Redux/Actions/actions';
import DropDownCatAdmin from './DropDownCatAdmin';
import CardAdmin from './CardAdmin';
import Pagination from './Pagination';

export default function AdminAllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const allProducts = useSelector((state) => state.home.products);
  const allCategories = useSelector((state) => state.home.categories);
  const deletedProductConfirm = useSelector((state) => state.admin.deletedProduct);
  useEffect(() => {
    dispatch(getProducts(search));
    dispatch(getCategories());
  }, [search, deletedProductConfirm]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts('limit=8&offset=1'));
  }, []);

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row font-lora">
        <NavbarAdmin />
        <div className="m-auto w-[85rem] h-full">
          <div className="flex flex-row flex-wrap">
            <div className="basis-1/2">
              <DropDownCatAdmin tittle="Categories" array={allCategories} />
            </div>
            <div className="basis-1/2">
              <SearchBarAdmin />
            </div>
          </div>
          <Pagination />
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
