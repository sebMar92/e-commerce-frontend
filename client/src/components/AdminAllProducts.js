import React from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useLocation } from 'react-router-dom';
import SearchBarAdmin from "./commons/SearchBarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories, getProducts } from "../Redux/Actions/actions";
import DropDownCategories from "./DropDownCategories";
import CardAdmin from './CardAdmin';

export default function AdminAllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const allProducts = useSelector((state) => state.home.products);
  const allCategories = useSelector((state) => state.home.categories);
  const products = useSelector((state) => state.home.products);
  useEffect(() => {
    dispatch(getProducts(search));
    dispatch(getCategories());
  }, [search]);
  
  useEffect(() => {
        dispatch(getCategories());
  }, []);
    
    console.log('aqui', products)  
    return (
            <>
            <NavBarEmpty/>
            <div className='flex flex-col sm:flex-row' >
                <NavbarAdmin />
                <div className='m-auto'>
                <DropDownCategories tittle="Categories" array={allCategories} />
                    <SearchBarAdmin/>
                    {/*<h1>Here admin can see all the products
                    </h1>*/}
                     {allProducts && 
                      allProducts.map((prod) => {
                       console.log(prod)
                      return (
                       <div>
 
                           <CardAdmin 
                            key={prod.id}
                            title={prod.title}
                            price={prod.price}
                            images={prod.images[0].url}
                            id={prod.id}
                               
                             />
                       </div>
                        );
                    })}

                </div>
            </div>
            </>
        );
    }