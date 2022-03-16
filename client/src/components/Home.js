import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';



export default function Home() {
    return (
        <>
        <NavBar/>
        <div className='home'>
            <h1>This is home</h1>
           <Card/>
        </div>
        <Footer/>
        </>
    );
}
