import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';

export default function PurchasePage() {
    return (
        <>
        <NavBar/>
        <div className='purchasepage'>
            <h1>This is purchase page</h1>

             {/* informacino de pago  */}
      <div className="flex flex-wrap justify-center">
        <div className="bg-secondary-100 w-9/12 m-5 p-5 rounded-md ">
          <h1>Payment information </h1>
          <br />
          <button className="bg-black text-white p-1 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition m-2">
            Tarjeta
          </button>
          <button className="bg-black text-white p-1 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition m-2">
            efectivo
          </button>
          <div>payment information</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#3b82f6] text-white p-1 my-8 rounded-md bg-secundary-100 cursor-pointer hover:bg-opacity-60 transition  w-24">
          Buy
        </button>
      </div>
        </div>
        <Footer/>
        </>
    );
}