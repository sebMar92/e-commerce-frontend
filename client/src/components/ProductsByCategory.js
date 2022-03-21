import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';
import FilterAndOrderComponent from './FilterAndOrden';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/Actions/actions';
import { useLocation } from 'react-router-dom';

export default function Products() {

    const dispatch = useDispatch()
    const location = useLocation()
    const search = location.search
    const allProducts = useSelector(state => state.home.products)

    useEffect(() => {
        dispatch(getProducts(search))
    }, [search])

    return (
        <>
            <NavBar />
            <div className='flex flex-col sm:flex-row'>
                <FilterAndOrderComponent />
                <div className='m-auto'>
                    <h1 className='font-bold font-lora flex justify-center my-8 text-4xl'>Products by Category</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-10 sm:m-auto 2xl:grid-cols-2 2xl:gap-30'>
                        {allProducts && allProducts.map(item => {
                            return (
                                <Card key={item.id} path={item.id} name={item.title} price={item.price} image={item.images[1].url} shippingCost={item.shippingCost} />
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

