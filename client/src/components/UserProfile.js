import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { AiFillEdit, AiFillCloseSquare } from "react-icons/ai"
import { RiImageEditFill } from "react-icons/ri"
import { BsSave2 } from "react-icons/bs"
import { getUserInfo, putUserInfo } from '../Redux/Actions/actions';
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "../components/modals/UserProfileModal"
import { Link } from "react-router-dom"
import axios from 'axios';



/* nose que esta pasando */


export default function UserProfile() {

    const token = window.localStorage.getItem("access")
    const user = useSelector((state) => state.home.user)
    const DirectionsUser = user.directions && user.directions
    console.log(user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserInfo(token))
    }, [token])
    console.log(user)

    useEffect(() => {
        setStateUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            prevPassword: "",
            newPassword: "",
            profilePicture: user.profilePicture,
            email: user.email,

        })
    }, [user])

    const answer = useSelector((state) => state.home.answer)
    console.log("answer", answer)


    const [stateUser, setStateUser] = useState({
        firstName: "",
        lastName: "",
        prevPassword: "",
        newPassword: "",
        profilePicture: "",
        email: "",
        direction: ""
    })
    /* console.log(stateUser) */


    function handleChange(e) {
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
        
    }

    function handleChangePassword(e){
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
        const length = document.getElementById("oldPassword").value.length
        if (length) {
            document.getElementById("newPassword").removeAttribute("disabled")
            document.getElementById("btnClosePassword").classList.add("hidden")
            document.getElementById("passwordBtn").classList.remove("hidden")
        } else {
            document.getElementById("newPassword").setAttribute("disabled", "");
            document.getElementById("btnClosePassword").classList.toggle("hidden")
            document.getElementById("passwordBtn").classList.toggle("hidden")
        }
    }


    function hanldeClickChangeData(value, e) {
        e && e.preventDefault()
        document.getElementById(value).removeAttribute("disabled");
        document.getElementById(value).getAttribute("disabled")
        /* FIRSTNAME */
        if (value === "firstNameUser") {
            document.getElementById("firstNameBtn").classList.toggle("hidden")
            document.getElementById("btnEdit1").classList.toggle("hidden")
        }
        if (value === "firstNameBtn") {
            document.getElementById("firstNameBtn").classList.toggle("hidden")
            document.getElementById("btnEdit1").classList.toggle("hidden")
            document.getElementById("firstNameUser").setAttribute("disabled", "");
            dispatch(putUserInfo(token, { firstName: stateUser.firstName }))
        }
        /* FIRSTNAME */

        /* LASTNAME */
        if (value === "lastNameUser") {
            document.getElementById("lastNameBtn").classList.toggle("hidden")
            document.getElementById("btnEdit2").classList.toggle("hidden")
        }
        if (value === "lastNameBtn") {
            document.getElementById("lastNameBtn").classList.toggle("hidden")
            document.getElementById("btnEdit2").classList.toggle("hidden")
            document.getElementById("lastNameUser").setAttribute("disabled", "");
            dispatch(putUserInfo(token, { lastName: stateUser.lastName }))
        }
        /* LASTNAME */

        /* EMAIL */
        if (value === "emailUser") {
            document.getElementById("emailBtn").classList.toggle("hidden")
            document.getElementById("btnEdit3").classList.toggle("hidden")
        }
        if (value === "emailBtn") {
            document.getElementById("emailBtn").classList.toggle("hidden")
            document.getElementById("btnEdit3").classList.toggle("hidden")
            document.getElementById("emailUser").setAttribute("disabled", "");
            dispatch(putUserInfo(token, { email: stateUser.email }))
        }
        /* EMAIL */

        /* PASSWORD */
        if (value === "passwordUser") {
            document.getElementById("btnClosePassword").classList.toggle("hidden")
            document.getElementById("btnEdit4").classList.toggle("hidden")
            document.getElementById("passwordUser").classList.toggle("hidden")
        }
        if (value === "passwordBtn") {
            const lengthOldPassword = document.getElementById("oldPassword").value.length
            const lengthNewPassword = document.getElementById("newPassword").value.length
            if (lengthOldPassword && lengthNewPassword) {

                document.getElementById("passwordBtn").classList.toggle("hidden")
                document.getElementById("btnEdit4").classList.toggle("hidden")
                document.getElementById("passwordUser").classList.toggle("hidden")
                dispatch(putUserInfo(token, { prevPassword: stateUser.prevPassword, newPassword: stateUser.newPassword }))
                setStateUser({
                    prevPassword: "",
                    newPassword: "",
                })
            } else {
                alert("Fill in the corresponding fields")
            }
        }
        /* PASSWORD */




    }

    const [stateModal, setStateModal] = useState(false)
    function handleCloseModal(e) {
        e.preventDefault()
        setStateModal(!stateModal)
    }

    let arr = [];
    const uploadImage = (files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
            formData.append("upload_preset", "ecommerce");
            const newAxios = axios.create();
            newAxios.post(
                "https://api.cloudinary.com/v1_1/dmjbff5rm/image/upload",
                formData
            ).then((res) => {
                arr.push(res.data.secure_url);
                console.log(arr.flat())
                setStateUser({
                    ...stateUser,
                    profilePicture: arr.flat(),
                });
            });
        }
    };

    function handleChangeImg() {
        dispatch(putUserInfo(token, { profilePicture: stateUser.profilePicture[0] }))
        document.getElementById("btnconfirmImg").classList.toggle("hidden")
    }

    function HandleBrowseClick() {
        var fileinput = document.getElementById("browse");
        fileinput.click();
        document.getElementById("btnconfirmImg").classList.toggle("hidden")
    }


    return (
        <>
            {stateModal ? <ModalPortal directionsUser={DirectionsUser} onClose={(e) => handleCloseModal(e)} /> : null}
            <div>
                <NavBar />
                <div className='userprofile'>
                    <div className="flex flex-col items-center justify-center">
                        <div>

                            <h1 className="text-center">User Profile</h1>
                            <br />

                            <img className='w-60 h-60 object-cover border-2 border-solid border-slate-700 rounded-full shadow-xl' src={stateUser.profilePicture} />

                            <input
                                id="browse"
                                type="file"
                                onChange={(e) => {
                                    uploadImage(e.target.files);
                                }}
                                className=" w-20 hidden"
                            />
                            <div className="text-xl translate-x-52 -translate-y-10 cursor-pointer">
                                <RiImageEditFill onClick={() => HandleBrowseClick()} />
                            </div>
                            <div className="flex justify-center items-center">
                                <input id="btnconfirmImg" className="hidden mb-1 mr-16 ml-16 p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 text-xs" type="button" value="Confirm image" onClick={() => handleChangeImg()} />
                            </div>
                            <h3 className="text-center">{stateUser.firstName} {stateUser.lastName}</h3>
                            <br />

                        </div>


                        {/* Formulario del usuario */}
                        <div className="flex flex-col w-96 justify-center items-center">

                            <div className="">
                                <Link to={`/historial`} className="no-underline text-black">
                                    <button className="p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 text-xs">Go to history</button>
                                </Link>

                                <Link to={`/wishlist`} className="no-underline text-black">

                                    <button className="mb-1 mr-16 ml-16 p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 text-xs">Go to wish list</button>
                                </Link>

                                <Link to={`/cart`} className="no-underline text-black">

                                    <button className="p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 text-xs">Go to cart</button>
                                </Link>

                            </div>

                            <div className='bg-secondary-100 rounded-md p-2 shadow-sm shadow-slate-900 mb-4'>
                                <h5 className="text-center mb-2">Data User</h5>

                                <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                    <span className="text-slate-500 m-1">First name</span>

                                    <div className="flex items-center">
                                        <form className="flex">
                                            <input
                                                id="firstNameUser"
                                                type="text"
                                                value={stateUser.firstName}
                                                name="firstName"
                                                onChange={(e) => handleChange(e)}
                                                disabled
                                                className="w-80 m-1 rounded-md"
                                            />

                                            <div id="btnEdit1" onClick={() => hanldeClickChangeData("firstNameUser")} className="cursor-pointer m-1 mt-2"><AiFillEdit /></div>
                                            <div>
                                                <button id="firstNameBtn" type='submit' onClick={(e) => hanldeClickChangeData("firstNameBtn", e)} className="hidden cursor-pointer m-1 mt-2"><BsSave2 /></button>
                                            </div>
                                        </form>

                                    </div>

                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>

                                    <span className="text-slate-500 m-1">LastName</span>

                                    <div className="flex items-center">
                                        <form className="flex">
                                            <input
                                                id="lastNameUser"
                                                type="text"
                                                value={stateUser.lastName}
                                                name="lastName"
                                                onChange={(e) => handleChange(e)}
                                                disabled
                                                className="w-80 m-1 rounded-md"
                                            />

                                            <div id="btnEdit2" onClick={() => hanldeClickChangeData("lastNameUser")} className="cursor-pointer m-1 mt-2"><AiFillEdit /></div>
                                            <div>
                                                <button id="lastNameBtn" type="submit" onClick={(e) => hanldeClickChangeData("lastNameBtn", e)} className="hidden cursor-pointer m-1 mt-2"><BsSave2 /></button>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>


                                    <span className="text-slate-500 m-1">Email</span>
                                    <div className="flex items-center">
                                        <form className="flex">
                                            <input
                                                id="emailUser"
                                                type="text"
                                                value={stateUser.email}
                                                name="email"
                                                onChange={(e) => handleChange(e)}
                                                disabled
                                                className="w-80 m-1 rounded-md"
                                            />

                                            <div id="btnEdit3" onClick={() => hanldeClickChangeData("emailUser")} className="cursor-pointer m-1 mt-2"><AiFillEdit /></div>
                                            <div>
                                                <button id="emailBtn" type="submit" onClick={(e) => hanldeClickChangeData("emailBtn", e)} className="hidden cursor-pointer m-1 mt-2"><BsSave2 /></button>
                                            </div>
                                        </form>
                                    </div>

                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>
                                    <form>
                                        <div className='flex justify-between'>

                                            <span className="text-slate-500 m-1">Password</span>


                                            <div
                                                id="btnEdit4"
                                                onClick={() => hanldeClickChangeData("passwordUser")}
                                                className="cursor-pointer m-1 mt-2">
                                                <AiFillEdit />
                                            </div>

                                            <div
                                                id="btnClosePassword"
                                                onClick={() => hanldeClickChangeData("passwordUser")}
                                                className="hidden cursor-pointer m-1 mt-2">
                                                <AiFillCloseSquare />
                                            </div>

                                            <button
                                                id="passwordBtn" type="submit" onClick={(e) => hanldeClickChangeData("passwordBtn", e)}
                                                className="hidden cursor-pointer m-1 mt-2">
                                                <BsSave2 />
                                            </button>


                                        </div>

                                        <div className="flex">

                                            <div id="passwordUser" className="ml-1 hidden">

                                                <div className="flex justify-between rounded-md shadow-sm shadow-slate-400 mb-1 p-1">
                                                    <span>Old password:</span>

                                                    <input
                                                        id="oldPassword"
                                                        type="password"
                                                        value={stateUser.prevPassword}
                                                        name="prevPassword"
                                                        onChange={(e) => handleChangePassword(e)}
                                                        className="ml-1 mb-1 rounded-md border border-solid border-slate-900" />

                                                </div>

                                                <div className="flex rounded-md shadow-sm shadow-slate-400 mb-1 p-1 ">
                                                    <span>New password:</span>

                                                    <input
                                                        id="newPassword"
                                                        type="password"
                                                        value={stateUser.newPassword}
                                                        name="newPassword"
                                                        onChange={(e) => handleChangePassword(e)}
                                                        disabled
                                                        className="ml-1 mb-1 rounded-md border border-solid border-slate-900" />

                                                </div>

                                            </div>



                                        </div>
                                    </form>
                                </div>

                                <div className='rounded-md shadow-sm shadow-slate-400 mb-1'>


                                    <div className='flex justify-between'>

                                        <span className="text-slate-500 m-1">Direction</span>

                                        <div id="btnEdit5" onClick={(e) => handleCloseModal(e)} className="m-1 cursor-pointer mt-2"><AiFillEdit /></div>

                                        <div id="directionBtn" onClick={() => hanldeClickChangeData("direction")} className="hidden cursor-pointer m-1 mt-2"><BsSave2 /></div>

                                    </div>

                                    <div className="flex items-center">

                                    </div>

                                </div>

                            </div>
                        </div>
                        {/* Formulario del usuario */}


                        {/* BUTTONS NewsLetter & DeleteAccount */}
                        <div className="flex sm:justify-between flex-col w-auto sm:w-96 m-1 mb-4">
                            <button className="hidden mb-2 p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 ">Subscribe NewsLetter</button>
                            <button className="hidden mb-2 p-1 bg-primary-300 rounded-lg shadow-sm shadow-slate-900 hover:shadow-md border-2 border-solid border-primary-500 ">Delete Account</button>
                        </div>
                        {/* BUTTONS NewsLetter & DeleteAccount */}

                    </div>
                    <Footer />
                </div>
            </div>

        </>
    );
}