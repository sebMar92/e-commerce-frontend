import React from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';

export default function AdminAllProducts() {
    return (
            <>
            <NavBarEmpty/>
            <div className='flex flex-col sm:flex-row' >
                <NavbarAdmin />
                <div className='m-auto'>
                    <h1>Here admin can see all the products
                    </h1>
                </div>
            </div>
            </>
        );
    }