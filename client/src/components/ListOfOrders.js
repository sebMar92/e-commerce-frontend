import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function ListOfOrders() {
    return (
        <>
        <NavBar/>
        <div className='listoforders'>
            <h1>Here admin can see list of orders.
            </h1>
        </div>
        <Footer/>
        </>
    );
}