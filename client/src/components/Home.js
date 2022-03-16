import React from 'react';
import NavBar from './NavBar'
import CarouselPromo from './CarouselPromo';
import CarouselCateg from './CarouselCateg';
import CardHome from './CardHome';
import Footer from './Footer/Footer';



export default function Home() {
    return (
        <>
        <NavBar/>
        <CarouselPromo />
        <div className='flex justify-center items-center gap-2'>
            <CarouselCateg />
            <CardHome/>
        </div>
        <Footer/>
        </>
    );
}   
