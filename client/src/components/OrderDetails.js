import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function OrderDetails() {
    return (
        <>
        <NavBar/>
        <div className='orderdetails'>
            <h1>Here admin can see details from an order.
            </h1>
        </div>
        <Footer/>
        </>
    );
}