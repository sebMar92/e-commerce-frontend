import React from 'react';
import NavBar from './NavBar'
import CarouselPromo from './CarouselPromo';
import CarouselCateg from './CarouselCateg';
import Footer from './Footer/Footer';
import CardHome from './CardHome';



export default function Home() {
    return (
        <>
        <NavBar/>
        <CarouselPromo />
        <div className='md:my-32'>
            <h1 className="flex justify-center">Category1</h1>
            <CarouselCateg />
        </div>
        <div className='my-32'>
            <h1 className="flex justify-center">Category2</h1>
            <CarouselCateg />
        </div>
        <div className='my-32'>
            <h1 className="flex justify-center">Category3</h1>
            <CarouselCateg />
        </div>
        <Footer/>
        </>
    );
}   

