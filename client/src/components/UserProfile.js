import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { AiFillEdit } from "react-icons/ai"


const userPrueba = {
    firstName: "Laurita",
    lastName: "Fernandez",
    password: "1234",
    porfilePicture: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    validate: true,
    email: "laurita123@gmail.com",
    rol: "user",
    newsletterSubscription: true,

    indexes: [{
        unique: true,
        fields: ["email"],
    }]
}



export default function UserProfile(userPrueba) {

    /* Aca deberia de hacerse un useEffec que al montarse el componente complete el estado local stateUser con los datos del usuarios que se trajeron de DB */
    /* useEffect(() => {
        setStateUser(userPrueba)
    })
 */

    const [stateUser, setStateUser] = useState({
        firstName: "Laurita",
        lastName: "Fernandez",
        password: "1234",
        porfilePicture: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        validate: true,
        email: "laurita123@gmail.com",
        rol: "user",
        newsletterSubscription: true,
        direction: "calle 13"
    })
   /*  useEffect(() => {
        document.getElementById("btnSubmit").classList.toggle("hidden");
    }, [stateUser]) */

    function handleChange(e) {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
        console.log(stateUser)
        /*  setErrors(validacion({
             ...stateUser,
             [e.target.name]: e.target.value
         })) */
    }
    function hanldeClickChangeData(value) {
        console.log(value)
        var atributos=  document.getElementById(value).removeAttribute("disabled", "");
        console.log("atributos", atributos)
    }


    return (
        <>
            <NavBar />
            <div className='userprofile'>
                <div className="flex flex-col items-center justify-center">
                    <div>

                        <h1 className="text-center">User Profile</h1>
                        <br />

                        <div className='w-60 border-2 border-solid border-slate-700 rounded-full shadow-xl'>
                            <img className='rounded-full' src={stateUser.porfilePicture} />
                        </div>

                        <h3 className="text-center">{stateUser.firstName} {stateUser.lastName}</h3>
                        <br />

                    </div>


                    {/* Formulario del usuario */}
                    <div className="flex flex-col w-96 justify-center items-center">
                        <form className='bg-secondary-100 rounded-md p-2 shadow-sm shadow-slate-900 mb-4'>
                            <h5 className="text-center mb-2">Data User</h5>
                            <div className="flex justify-evenly">

                                <button className="mb-2 text-xs  rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border border-solid border-primary-500 ">Modify information</button>

                                <button id="btnSubmit" className="mb-2 text-xs  rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border border-solid border-primary-500 ">Submit changes</button>

                            </div>

                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                <span>First name</span>

                                <div className="flex items-center">
                                    <input
                                        id="firstNameUser"
                                        type="text"
                                        value={stateUser.firstName}
                                        name="firstName"
                                        onChange={(e) => handleChange(e)}
                                        disabled
                                        className="w-80 m-1 rounded-md"
                                    />

                                    <div onClick={()=>hanldeClickChangeData("firstNameUser")}><AiFillEdit /></div>
                                </div>

                            </div>

                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                <span>LastName</span>

                                <div className="flex items-center">
                                    <input
                                        id="lastNameUser"
                                        type="text"
                                        value={stateUser.lastName}
                                        name="lastName"
                                        onChange={(e) => handleChange(e)}
                                        className="w-80 m-1 rounded-md"
                                    />

                                    <button><AiFillEdit /></button>
                                </div>

                            </div>

                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>


                                <span className="text-slate-500">Email</span>
                                <div className="flex items-center">
                                    <input
                                        id="emailUser"
                                        type="text"
                                        value={stateUser.email}
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                        className="w-80 m-1 rounded-md"
                                    />

                                    <button><AiFillEdit /></button>
                                </div>

                            </div>

                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                <span className="flex justify-center">Password</span>

                                <div className="flex items-center">
                                    <input
                                        id="passwordUser"
                                        type="password"
                                        value={stateUser.password}
                                        name="password"
                                        onChange={(e) => handleChange(e)}
                                        className="w-80 m-1 rounded-md"
                                    />

                                    <button><AiFillEdit /></button>
                                </div>

                            </div>

                            <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                <span className="text-slate-300  flex justify-center">Direction</span>

                                <div className="flex items-center">
                                    <input
                                        id="direction"
                                        type="text"
                                        value={stateUser.direction}
                                        name="direction"
                                        onChange={(e) => handleChange(e)}
                                        className="w-80 m-1 rounded-md"
                                    />

                                    <button><AiFillEdit /></button>
                                </div>

                            </div>

                        </form>
                    </div>
                    {/* Formulario del usuario */}


                    {/* BUTTONS NewsLetter & DeleteAccount */}
                    <div className="flex justify-between w-96 m-1 mb-4">
                        <button className="p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 ">Subscribe NewsLetter</button>
                        <button className="p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 ">Delete Account</button>
                    </div>
                    {/* BUTTONS NewsLetter & DeleteAccount */}

                </div>
                <Footer />
            </div>
        </>
    );
}