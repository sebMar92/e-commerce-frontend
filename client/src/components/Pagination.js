import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

export default function Pagination() {
    const navigate = useNavigate()
    const location = useLocation().search

    const decodedLocation = decodeURI(location)//decodifica la url
    const locationSplit = decodedLocation.split(/[?&]/ig)
    const locationNoEmptyElements = locationSplit.filter(e => e !== "")
    const queryArray = locationNoEmptyElements.map(e => {
        const split = e.split("=");
        return {
            [split[0]]: split[1]
        }
    })
    const queryObjects = Object.assign({}, ...queryArray);


    const pages = useSelector(state => state.home.totalPages)


    var aux = []
    var btns = pages //4
    for (var i = 1; i <= btns; i++) {
        aux.push(i)
    }


    return (
        <div>
            <nav>
                <ul className="flex justify-evenly sm:justify-center m-2">
                    <div>
                        <button className="m-0.5 text-2xl text-secondary-200 border-2 rounded-full border-primary-400 hover:scale-125 hover:shadow hover:shadow-secondary-500"><BsFillArrowLeftCircleFill /></button>
                        <label className="flex flex-col sm:hidden">Previous</label>
                    </div>


                    {aux && aux.map(number => {
                        return (
                            <div id={number} key={number} className="hidden sm:flex sm:justify-center">
                                <li >
                                    <button id={number} onClick={(e) => {
                                        navigate({
                                            search: createSearchParams({
                                                ...queryObjects,
                                                offset: e.target.id,
                                            }).toString()
                                        }); console.log(e.target.id)
                                    }}
                                        className="mx-1 w-5 h-5 flex justify-center items-center text-xs rounded-full bg-primary-400 m-1 hover:scale-125 hover:border-secondary-500 hover:shadow hover:shadow-secondary-500 focus:scale-125 focus:shadow focus:shadow-secondary-500">{number}</button>
                                </li>
                            </div>
                        )
                    })
                    }
                    <div>
                        <button className="m-0.5 text-2xl text-secondary-200 border-2 rounded-full border-primary-400 hover:scale-125 hover:shadow hover:shadow-secondary-500" ><BsFillArrowRightCircleFill /></button>
                        <label className="flex flex-col sm:hidden">Next</label>
                    </div>
                </ul>
            </nav >
        </div>
    )
}