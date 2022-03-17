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
        <div>
            <h1 className="flex justify-center">Category1</h1>
            <CarouselCateg />
        </div>
            <div>
            <h1 className="flex justify-center">Category2</h1>
            <CarouselCateg />
        </div>
            <div>
            <h1 className="flex justify-center">Category3</h1>
            <CarouselCateg />
        </div>
        <Footer/>
        </>
    );
}   

