import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import CardWishlist from './CardWishlist';


export default function Wishlist() {
    return (
        <>
        <NavBar/>
        <div className='wishlist'>
            <h1>This is Wishlist</h1>
            <CardWishlist/>
        </div>
        <Footer/>
        </>
    );
}