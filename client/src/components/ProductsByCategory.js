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
                <div className='products'>
                    <h1>This is products by category</h1>
                    <p></p>
                    <div className='sm:flex sm:flex-wrap'>
                        {allProducts && allProducts.map(item => {
                            return (
                                <Card key={item.id} name={item.title} price={item.price} image={item.images[1].url} shippingCost={item.shippingCost} />
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

