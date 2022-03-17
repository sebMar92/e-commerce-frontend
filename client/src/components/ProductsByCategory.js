import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';
import FilterAndOrderComponent from './FilterAndOrden';
import Pagination from './Pagination';

export default function Products() {
    return (
        <>
            <NavBar />
            <div className='flex flex-col sm:flex-row'>
                <FilterAndOrderComponent />
                <div className='products'>
                    <h1>This is products by category</h1>
                    <Card />
                </div>
            </div>
            <Pagination />
            <Footer />
        </>
    );
}


