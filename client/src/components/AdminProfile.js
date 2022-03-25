import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';


export default function AdminProfile() {
    return (
        <>
        <NavBar/>
        <div className='flex flex-col sm:flex-row' >
            <NavbarAdmin />
            <div className='m-auto'>
                <h1>This is Admin's profile.
                It shows recent users, best sellers,
                latest shoppings
                </h1>
            </div>
        </div>
        <Footer/>
        </>
    );
}