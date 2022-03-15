import React from "react";


/* import { useLocation } from 'react-router-dom'; */

export default function AllFooter() {


    return (
        <div>
            <footer >

                <div className="bg-gray-300 flex flex-row justify-evenly">
                    <div>
                        <h4>Need help?</h4>
                        <h6>Contact us</h6>
                        <h6>Leave a comment</h6>
                    </div>

                    <div>
                        <h4>Know us</h4>
                        <h6>About</h6>
                        <h6>Integrants</h6>
                    </div>

                    <div>
                        <h4>Follow us</h4>
                        <h6>Facebook</h6>
                        <h6>Twitter</h6>
                        <h6>Instagram</h6>
                    </div>

                    <div>
                        <h4>My account</h4>
                        <h6>Profile</h6>
                        <h6>Favorites</h6>
                        <h6>Shopps</h6>
                    </div>
                </div>
                <p className="bg-gray-300">© 2022 by Nombre Empresa</p>

            </footer>
        </div>

    )
}