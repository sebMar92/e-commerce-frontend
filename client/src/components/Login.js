import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import LoginComponent from './LoginComponent';
import NavBarEmpty from './NavBarEmpty';
import EmailVerification from './EmailVerification';


export default function Login() {
    return (
        <>
        <NavBarEmpty />
        <EmailVerification />
        <Footer />
        </>
    );
}