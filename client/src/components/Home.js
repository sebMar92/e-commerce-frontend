import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import CardHome from './CardHome';




export default function Home() {
    return (
        <>
        <NavBar/>
        <div className='home'>
            
            <h1>This is home</h1>
           <CardHome/>
        </div>
        <Footer/>
        </>
    );
}   
