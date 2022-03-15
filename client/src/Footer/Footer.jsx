import React from "react";
import { useLocation } from "react-router-dom"

import AllFooter from "./AllFooter";
import FooterHome from "./FooterHome";

/* import { useLocation } from 'react-router-dom'; */

export default function Footer() {
    const location = useLocation()
    const sitio = location.pathname



    if (sitio === "/") {
        return (
            <div>
                <FooterHome />
                <AllFooter />
            </div>
        )
    } else {
        return (
            <AllFooter />
        )
    }
}