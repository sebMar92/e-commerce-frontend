import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function ActivateDiscounts() {
    return (
        <>
        <NavBar/>
        <div className='activatediscount'>
            <h1>Here admin can activate discounts added to the products.
            </h1>
        </div>
        <Footer/>
        </>
    );
}