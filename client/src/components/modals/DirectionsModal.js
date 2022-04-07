import React from "react";
import ReactDOM from 'react-dom';
import { BiError } from "react-icons/bi"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { Link } from "react-router-dom"

function DirectionsModal({ onClose }) {




    return (
        <div className="bg-black/20 fixed h-screen w-screen z-50">
            <div className="p-2 w-full md:w-3/4 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md  bg-secondary-100  shadow-sm shadow-slate-900 font-lora">

                <div className="flex justify-end">
                    <button onClick={onClose} className="cursor-pointer text-3xl hover:text-primary-600 hover:scale-125" ><AiOutlineCloseCircle /> </button>
                </div>

                <div className="flex flex-col text-center items-center">
                    <h1 className="p-2 border-b-[1px] border-primary-600">
                        You need to have an address to make the purchase!</h1>
                    <span className="mt-6 text-8xl"><BiError /></span>
                </div>

                <div className="flex justify-center mt-8">
                    <Link to="/user" className="no-underline text-black">
                        <button className="p-1 pl-2 pr-2 bg-primary-600 rounded-md hover:scale-110">Register address</button>
                    </Link>
                </div>

            </div>
        </div >
    )
}

export default function ModalPortalDirections({ onClose }) {
    return ReactDOM.createPortal(
        <DirectionsModal onClose={onClose}>
        </DirectionsModal>,
        document.getElementById("modal")
    )
}