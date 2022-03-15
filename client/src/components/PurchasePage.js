import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default function PurchasePage() {
    return (
        <>
        <NavBar/>
        <div className='purchasepage'>
            <h1>This is purchase page</h1>
        </div>
        <Footer/>
        </>
    );
}