import React from "react";

export default function FooterHome() {
    function hanldeClickDeletData() {
        document.getElementById("texto").value = ""
    }

    return (
        <div>
            <footer className="bg-gray-50 flex flex-row flex-wrap justify-evenly items-center p-6 font-lora">

                <div>
                    <h1>Join our newsletter</h1>
                    <p>Subscribe today and get a 10% cuppon discount</p>
                </div>

                <div>
                    <input id="texto" type="text" placeholder="Example@gmail.com" className="border-solid border-black border-b-2 rounded-t-sm rounded-bl-sm" />

                    <input onClick={hanldeClickDeletData} type="submit" value="Suscribe" className="bg-black p-1 text-white text-sm border-b-black border-b-2 rounded-sm cursor-pointer active:translate-y-1" />
                </div>

            </footer>
        </div>

    )
}