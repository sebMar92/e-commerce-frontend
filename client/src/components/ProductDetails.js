import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function ProductDetails() {
    return (
        <>
        <NavBar/>
        <div className='product'>
            <h1>This is product details</h1>
        </div>
        <Footer/>
        </>
    );
}