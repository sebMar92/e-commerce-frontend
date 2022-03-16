import React from 'react';
import NavBar from './NavBar';
import CardHome from './CardHome';
import Footer from './Footer/Footer';


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
