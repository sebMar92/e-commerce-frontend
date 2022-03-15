import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function Wishlist() {
    return (
        <>
        <NavBar/>
        <div className='wishlist'>
            <h1>This is Wishlist</h1>
        </div>
        <Footer/>
        </>
    );
}