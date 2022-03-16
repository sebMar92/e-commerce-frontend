import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function Cart({}) {
    return (
        <>
        <NavBar/>
        <div className='cart'>
            <h1>This is Cart</h1>
        </div>
        <Footer/>
        </>
    );
}