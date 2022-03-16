import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';

export default function Products() {
    return (
        <>
        <NavBar/>
        <div className='products'>
            <h1>This is products by category</h1>
            <Card/>
        </div>
        <Footer/>
        </>
    );
}