import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function NewsletterEdit() {
    return (
        <>
        <NavBar/>
        <div className='newsletter'>
            <h1>Here admin can edit the newsletter.
            </h1>
        </div>
        <Footer/>
        </>
    );
}