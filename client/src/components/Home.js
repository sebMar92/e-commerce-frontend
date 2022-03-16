import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import CarouselPromo from './CarouselPromo';
import CarouselCateg from './CarouselCateg';



export default function Home() {
    return (
        <>
        <NavBar/>
        <CarouselPromo />
        <div className='flex justify-center items-center gap-2'>
            <CarouselCateg />
        </div>
        <Footer/>
        </>
    );
}   
