import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';


export default function UserProfile() {
    return (
        <>
        <NavBar/>
        <div className='userprofile'>
            <h1>This is User Profile</h1>
        </div>
        <Footer/>
        </>
    );
}