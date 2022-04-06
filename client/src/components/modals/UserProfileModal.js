import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { AiOutlineSend } from "react-icons/ai"
import { putUserInfo, postDirectionUser, getUserInfo, deleteAdressUser } from '../../Redux/Actions/actions.js';
import { useDispatch, useSelector } from "react-redux"


function UserProfileModal({ onClose, directionsUser }) {
    const dispatch = useDispatch()
    const res = useSelector((state) => state.home.resNewAdress)
    const answer = useSelector((state) => state.home.answer)

    useEffect(() => {
        dispatch(getUserInfo())
    }, [res, answer])

    const [stateDirections, setStateDirections] = useState({
        id: "",
        city: "",
        street: "",
        streetNumber: 0,
        floor: "",
        unit: "",
        postalCode: "",
    })

    function handleSubmitChangeAdressExist(e) {
        e.preventDefault()
        dispatch(putUserInfo({ direction: stateDirections }))
        alert("Updated data")
    }

    function handleChange(e) {
        setStateDirections({
            ...stateDirections,
            [e.target.name]: e.target.value
        })

    }

    function handleChangeStreetNumber(e) {
        setStateDirections({
            ...stateDirections,
            [e.target.name]: Number(e.target.value)
        })

    }

    function handleClickSelectAdrees(data) {
        document.getElementById(data.id).classList.toggle("hidden");
        setStateDirections({
            id: data.id,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber,
            floor: data.floor,
            unit: data.unit,
            postalCode: data.postalCode,
        })
    }

    function handleClickNewAdress(e) {
        e.preventDefault()
        document.getElementById("formExistAdress").classList.toggle("hidden")
        document.getElementById("formNewAdress").classList.toggle("hidden")
        document.getElementById("titleAdresses").classList.toggle("hidden")
        document.getElementById("newAdress").classList.toggle("hidden")
        document.getElementById("btnNewAdress").classList.toggle("hidden")
        document.getElementById("btnAddAdress").classList.toggle("hidden")
    }

    const [stateNewDirection, setStateNewDirection] = useState({
        city: "",
        street: "",
        streetNumber: 0,
        floor: "",
        unit: "",
        postalCode: "",
    })

    function handleSubmitChangeNewAdress(e) {
        e.preventDefault()
        if (!stateNewDirection.city || !stateNewDirection.street || !stateNewDirection.streetNumber || !stateNewDirection.postalCode) {
            return alert("Complete the required fields")
        }

        dispatch(postDirectionUser(stateNewDirection))
        setStateNewDirection({
            city: "",
            street: "",
            streetNumber: 0,
            floor: "",
            unit: "",
            postalCode: "",
        })
        document.getElementById("btnAddAdress").click()
    }

    function handleChangeNewDirection(e) {
        setStateNewDirection({
            ...stateNewDirection,
            [e.target.name]: e.target.value
        })
    }

    function handleChangeNewStreetNumber(e) {
        setStateNewDirection({
            ...stateNewDirection,
            [e.target.name]: Number(e.target.value)
        })
    }

    function handleClickDeleteAdress(e, id) {
        e.preventDefault()
        dispatch(deleteAdressUser(id))
    }



    return (
        <div className="bg-black/20 fixed h-screen w-screen z-50">
            <div className="p-2 w-full md:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md  bg-secondary-100  shadow-sm shadow-slate-900">

                <div className="flex justify-between">

                    <input type="button" value="X" onClick={onClose} className="cursor-pointer" />

                    <button id="btnNewAdress" onClick={(e) => handleClickNewAdress(e)} className="cursor-pointer bg-secondary-100 rounded-md pl-1 pr-1 shadow-sm shadow-slate-900 border border-solid border-primary-500 hover:shadow-md">New Adress</button>

                    <button id="btnAddAdress" onClick={(e) => handleClickNewAdress(e)} className="hidden cursor-pointer bg-secondary-100 rounded-md pl-1 pr-1 shadow-sm shadow-slate-900 border border-solid border-primary-500 hover:shadow-md">Return</button>

                </div>

                <h3 id="titleAdresses" className="text-center">Adresses</h3>
                <h3 id="newAdress" className="text-center hidden">New Adresse</h3>

                {/* Formulario de creacion de direcciones */}
                <div>
                    <form onSubmit={(e) => handleSubmitChangeNewAdress(e)} id="formNewAdress" className='hidden rounded-md shadow-sm shadow-slate-400 mb-1 pb-1'>
                        <div className='pt-1'>
                            <div className='rounded-md shadow-sm shadow-slate-400 m-1'>
                                <span>*City:</span>
                                <div>
                                    <input
                                        id=""
                                        type="text"
                                        value={stateNewDirection.city}
                                        name="city"
                                        onChange={(e) => handleChangeNewDirection(e)}
                                        className="w-auto m-1 rounded-md"
                                    />

                                </div>
                            </div>

                            <div className='rounded-md flex justify-start max-w-full'>
                                <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                    <span>*Street:</span>
                                    <div>
                                        <input
                                            id=""
                                            type="text"
                                            value={stateNewDirection.street}
                                            name="street"
                                            onChange={(e) => handleChangeNewDirection(e)}
                                            className="w-40 m-1 rounded-md"
                                        />

                                    </div>
                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                    <span>*Street number:</span>
                                    <div>
                                        <input
                                            id=""
                                            type="number"
                                            value={stateNewDirection.streetNumber}
                                            name="streetNumber"
                                            onChange={(e) => handleChangeNewStreetNumber(e)}
                                            className="w-40 m-1 rounded-md"
                                        />

                                    </div>
                                </div>

                            </div>

                            <div className='max-w-full rounded-md flex justify-start'>
                                <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                    <span>Floor:</span>
                                    <div>
                                        <input
                                            id=""
                                            type="text"
                                            value={stateNewDirection.floor}
                                            name="floor"
                                            onChange={(e) => handleChangeNewDirection(e)}
                                            className="w-40 m-1 rounded-md"
                                        />

                                    </div>
                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                    <span>Unit:</span>
                                    <div>
                                        <input
                                            id=""
                                            type="text"
                                            value={stateNewDirection.unit}
                                            name="unit"
                                            onChange={(e) => handleChangeNewDirection(e)}
                                            className="w-40 m-1 rounded-md"
                                        />

                                    </div>
                                </div>

                            </div>

                            <div className='max-w-full rounded-md flex justify-start'>

                                <div className='w-44 rounded-md shadow-sm shadow-slate-400 m-1'>
                                    <span>*Postal Code:</span>
                                    <div>
                                        <input
                                            id=""
                                            type="text"
                                            value={stateNewDirection.postalCode}
                                            name="postalCode"
                                            onChange={(e) => handleChangeNewDirection(e)}
                                            className="w-40 m-1 rounded-md"
                                        />

                                    </div>
                                </div>

                                <div id="submitChanges" className="">
                                    <button type="submit" onSubmit={(e) => handleSubmitChangeNewAdress(e)}
                                        className='text-md items-center flex rounded-md shadow-sm shadow-slate-400 m-1 w-44 justify-center'>
                                        Submit New Adress   <AiOutlineSend />
                                    </button>
                                </div>

                            </div>



                        </div>
                    </form>
                </div>

                {/* Formulario de creacion de direcciones */}



                {/* Formulario de direcciones existentes */}
                <div id="formExistAdress" className="bg-secondary-100 rounded-md p-2 shadow-sm shadow-slate-900">
                    {/* Aca mostrar ciudad y calle */}
                    <form onSubmit={(e) => handleSubmitChangeAdressExist(e)}>
                        <div>
                            {directionsUser && directionsUser.length ?
                                directionsUser && directionsUser.map((data) => {
                                    return (
                                        <div key={data.id}>
                                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1 pb-1 border border-solid border-slate-900'>

                                                <div className=" flex justify-between" >
                                                    <div className="cursor-pointer" onClick={() => handleClickSelectAdrees(data)}>
                                                        <span>{data.city}, {data.street} {data.streetNumber}</span>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="pl-1 pr-1 h-6 text-xs mr-1 p-0 cursor-pointer bg-secondary-100 rounded-md shadow-sm shadow-slate-900 border border-solid border-primary-500 hover:shadow-md hover:bg-red-600 hover:border-black hover:text-white" onClick={(e) => handleClickDeleteAdress(e, data.id)}>DeleteAdress</button>
                                                    </div>
                                                </div>

                                                <div id={data.id} className='hidden'>
                                                    <div className='rounded-md shadow-sm shadow-slate-400 m-1'>
                                                        <span>City:</span>
                                                        <div>
                                                            <input
                                                                id={data.id}
                                                                type="text"
                                                                value={stateDirections.city}
                                                                name="city"
                                                                onChange={(e) => handleChange(e)}
                                                                className="w-auto m-1 rounded-md"
                                                            />

                                                        </div>
                                                    </div>

                                                    <div className='rounded-md flex justify-start max-w-full'>
                                                        <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                                            <span>Street:</span>
                                                            <div>
                                                                <input
                                                                    id={data.id}
                                                                    type="text"
                                                                    value={stateDirections.street}
                                                                    name="street"
                                                                    onChange={(e) => handleChange(e)}
                                                                    className="w-40 m-1 rounded-md"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                                            <span>Street number:</span>
                                                            <div>
                                                                <input
                                                                    id={data.id}
                                                                    type="number"
                                                                    value={stateDirections.streetNumber}
                                                                    name="streetNumber"
                                                                    onChange={(e) => handleChangeStreetNumber(e)}
                                                                    className="w-40 m-1 rounded-md"
                                                                />

                                                            </div>
                                                        </div>

                                                    </div>



                                                    <div className='max-w-full rounded-md flex justify-start'>
                                                        <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                                            <span>Floor:</span>
                                                            <div>
                                                                <input
                                                                    id={data.id}
                                                                    type="text"
                                                                    value={stateDirections.floor}
                                                                    name="floor"
                                                                    onChange={(e) => handleChange(e)}
                                                                    className="w-40 m-1 rounded-md"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className='rounded-md shadow-sm shadow-slate-400 m-1 w-44'>
                                                            <span>Unit:</span>
                                                            <div>
                                                                <input
                                                                    id={data.id}
                                                                    type="text"
                                                                    value={stateDirections.unit}
                                                                    name="unit"
                                                                    onChange={(e) => handleChange(e)}
                                                                    className="w-40 m-1 rounded-md"
                                                                />

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='max-w-full rounded-md flex justify-start'>

                                                        <div className='w-44 rounded-md shadow-sm shadow-slate-400 m-1'>
                                                            <span>Postal Code:</span>
                                                            <div>
                                                                <input
                                                                    id={data.id}
                                                                    type="text"
                                                                    value={stateDirections.postalCode}
                                                                    name="postalCode"
                                                                    onChange={(e) => handleChange(e)}
                                                                    className="w-40 m-1 rounded-md"
                                                                />

                                                            </div>
                                                        </div>

                                                        <div id="submitChanges" className="">
                                                            <button type="submit" onSubmit={(e) => handleSubmitChangeAdressExist(e)}
                                                                className='text-md items-center flex rounded-md shadow-sm shadow-slate-400 m-1 w-44 justify-center'>
                                                                Submit Changes   <AiOutlineSend />
                                                            </button>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                                : <span>No addresses registered</span>
                            }
                        </div>
                    </form>


                </div>
                {/* Formulario de direcciones existentes */}





            </div>
        </div >
    )
}

export default function ModalPortal({ onClose, directionsUser }) {
    return ReactDOM.createPortal(
        <UserProfileModal onClose={onClose} directionsUser={directionsUser}>
        </UserProfileModal>,
        document.getElementById("modal")
    )
}