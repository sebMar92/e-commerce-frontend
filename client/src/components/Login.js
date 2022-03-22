import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import LoginComponent from './LoginComponent';
import NavBarEmpty from './NavBarEmpty';


export default function Login() {
    return (
        <>
        <NavBarEmpty />
        <LoginComponent />
        <Footer />
        </>
    );
}