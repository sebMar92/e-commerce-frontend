import React from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useLocation } from 'react-router-dom';
import SearchBarAdmin from "./commons/SearchBarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories, getProducts } from "../Redux/Actions/actions";
import DropDownCatAdmin from "./DropDownCatAdmin";
import CardAdmin from './CardAdmin';
import Pagination from './Pagination';

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
                 <div className='flex flex-row flex-wrap'>
                 <div className='basis-1/2'>
                <DropDownCatAdmin tittle="Categories" array={allCategories} />
                </div>  
                <div className='basis-1/2'>
                    <SearchBarAdmin/>
                  </div>   
                  </div>   
                    {/*<h1>Here admin can see all the products
                    </h1>*/}
                    <div className='w-full sm:gap-0 sm:m-auto 2xl:grid-cols-2 2xl:gap-0'>
                     {allProducts && 
                      allProducts.map((prod) => {
                       console.log(prod)
                      return (
                       <div className='w-full'>
 
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
            </div>
            <Pagination />
            </>
        );
    }