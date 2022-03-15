import React from "react";

export default function FooterHome() {


    return (
        <div>
            <footer className="bg-gray-50 flex flex-row flex-wrap justify-evenly items-center p-6">

                <div>
                    <h1>Join our newsletter</h1>
                    <p>Subscribe today and get a 10% cuppon discount</p>
                </div>

                <div>
                    <input type="text" placeholder="Example@gmail.com" className="border-solid border-black border-b-2 rounded-t-sm rounded-bl-sm"/>

                    <input type="submit" value="Suscribe" className="bg-black text-white border-b-black border-b-2 rounded-r-sm rounded-b-sm cursor-pointer"/>
                </div>

            </footer>
        </div>

    )
}