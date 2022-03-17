import React from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"

                                          //       1                    2          3
export default function Pagination(/* [  [{item},{item},{item}]  [{},{},{}]  [{},{},{}]  ] */) {
    var arrayAux = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const numberOfPage = []

    for (var i = 1; i <= arrayAux.length; i++) {
        numberOfPage.push(i)

    }
    const paginado = (numberOfPage) => {
        //Aca se deberia ejecutar el seteo del estado local que se va a renderizar
        /* setPaginaActual(numberOfPage) */
    }


    return (
        <div>
            <nav>
                <ul className="flex justify-evenly sm:justify-center m-2">
                    <div>
                        <button className="m-0.5 text-2xl text-secondary-200 border-2 rounded-full border-primary-400 hover:scale-125 hover:shadow hover:shadow-secondary-500"><BsFillArrowLeftCircleFill /></button>
                        <label className="flex flex-col sm:hidden">Previous</label>
                    </div>
                    {
                        numberOfPage && numberOfPage.map(number => {
                            return (
                                <div className="hidden sm:flex sm:justify-center">
                                    <li key={number}>
                                        <button onClick={() => paginado(number)} className="mx-1 w-5 h-5 flex justify-center items-center text-xs rounded-full bg-primary-400 m-1 hover:scale-125 hover:border-secondary-500 hover:shadow hover:shadow-secondary-500 focus:scale-125 focus:shadow focus:shadow-secondary-500">{number}</button>
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