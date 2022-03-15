import React from "react";
import { useLocation } from "react-router-dom"

import GeneralFooter from "./GeneralFooter";
import FooterHome from "./FooterHome";

export default function Footer() {
    const location = useLocation()
    const sitio = location.pathname



    if (sitio === "/") {
        return (
            <div>
                <FooterHome />
                <GeneralFooter />
            </div>
        )
    } else {
        return (
            <GeneralFooter />
        )
    }
}