import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';
import FilterAndOrderComponent from './FilterAndOrden';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProducts } from '../Redux/Actions/actions';
import { useLocation } from 'react-router-dom';
import useURLqueries from "./hooks/useURLqueries";
import { ToastContainer,toast } from 'react-toastify';

export default function Products() {
    const queryObjects = useURLqueries();
    const dispatch = useDispatch()
    const location = useLocation()
    const search = location.search
    const allProducts = useSelector(state => state.home.products)
    const categories = useSelector(state => state.home.categories)
    const valueTitle = categories[queryObjects.categoryId - 1]

    useEffect(() => {
        dispatch(getProducts(search))
        dispatch(getCategories())
    }, [search])

    const notifyCat = () => {
            toast.success("Added to the wishlist !", {
            position: toast.POSITION.BOTTOM_LEFT
            });
        }
        
        const notifyCat2 = () => {
            toast.success("Added to the cart !", {
            position: toast.POSITION.BOTTOM_LEFT
            });
        }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className='flex flex-col sm:flex-row'>
                <FilterAndOrderComponent />
                <div className='m-auto'>
                    <h1 className='font-bold font-lora flex justify-center my-8 text-4xl bg-primary-400 p-1 rounded-xl'>{valueTitle? valueTitle.name: ""}</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-10 sm:m-auto 2xl:grid-cols-2 2xl:gap-30'>
                        {allProducts && allProducts.map(item => {
                            return (
                                <Card id={item.id} key={item.id} path={item.id} name={item.title} price={item.price} image={item.images[1].url} shippingCost={item.shippingCost} onClick={notifyCat} onClick2={notifyCat2}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Pagination />
            <Footer />
        </>
    );
}

