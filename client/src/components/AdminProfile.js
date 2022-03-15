import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function AdminProfile() {
    return (
        <>
        <NavBar/>
        <div className='admin'>
            <h1>This is Admin's profile.
                It shows recent users, best sellers,
                latest shoppings
            </h1>
        </div>
        <Footer/>
        </>
    );
}