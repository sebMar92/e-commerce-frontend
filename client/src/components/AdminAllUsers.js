import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default function AdminAllUsers() {
    return (
        <>
        <NavBar/>
        <div className='allusers'>
            <h1>Here admin can see all users.
            </h1>
        </div>
        <Footer/>
        </>
    );
}