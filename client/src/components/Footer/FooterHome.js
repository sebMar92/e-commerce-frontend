import React from "react";

export default function FooterHome() {


    return (
        <div>
            <footer className="bg-gray-50 flex flex-row flex-wrap justify-evenly items-center">

                <div>
                    <h2>Join our newsletter</h2>
                    <p>Subscribe today and get a 10% cuppon discount</p>
                </div>

                <div>
                    <input type="text" placeholder="Example@gmail.com"/>
                    <input type="submit" value="Suscribe"/>
                </div>

            </footer>
        </div>

    )
}