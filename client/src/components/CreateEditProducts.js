import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function CreateEditProducts() {
    return (
        <>
        <NavBar/>
        <div className='createditproducts'>
            <h1>Here admin can create and edit products.
            </h1>
        </div>
        <Footer/>
        </>
    );
}