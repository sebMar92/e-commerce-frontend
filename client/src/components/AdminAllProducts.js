import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function AdminAllProducts() {
    return (
        <>
        <NavBar/>
        <div className='allproducts'>
            <h1>Here admin can see all products,
                filter by ..., delete, edit, add discount...
            </h1>
        </div>
        <Footer/>
        </>
    );
}