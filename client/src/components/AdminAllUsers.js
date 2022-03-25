import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';

export default function AdminAllUsers() {
    return (
            <>
            <NavBar/>
            <div className='flex flex-col sm:flex-row' >
                <NavbarAdmin />
                <div className='m-auto'>
                    <h1>Here admin can see all users
                    </h1>
                </div>
            </div>
            <Footer/>
            </>
        );
    }