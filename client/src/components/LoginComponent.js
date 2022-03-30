import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonBuy from '../components/commons/ButtonComplete';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, postNewUser, validateMail, postOrder } from '../Redux/Actions/actions';
import LoggedModal from './modals/LoggedModal';
import EmailVerification from './EmailVerification';

export default function LoginComponent(boolean) {
    const message = useSelector((state) => state.home.userTokens);
    const mailRes = useSelector((state) => state.home.userMail);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    //   const [refresh,setRefresh] = useLocalStorage("refresh","")

    //Accedo al valor de la respuesta
    const value = Object.entries(boolean)[0][1]
    const [hasAccount, setHasAccount] = useState(value)
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(message)
    //Renderizo un form u otro en base al booleano que recibo por props 


    const onSubmit = data => {
        if(!hasAccount){
        dispatch(postNewUser(data))
        setHasAccount(!hasAccount)
        }else{
        dispatch(loginUser(data))
        }
    }   

    useMemo(() => {
        if(message.hasOwnProperty("error")){
            console.log(message.error)
        }else if(message && hasAccount){
            navigate("/")
            window.localStorage.setItem("access",message.accessToken)
            window.localStorage.setItem("refresh",message.refreshToken)
        }

            const wishList = window.localStorage.getItem("inWishList")
            const cart = window.localStorage.getItem("inCart")

            if(cart) {
                var parsedCart = JSON.parse(cart)
                parsedCart.map(el => dispatch(postOrder(el)))
            }

            if(wishList) {
                var parsedWishList = JSON.parse(wishList)
                parsedWishList.map(el => dispatch(postOrder(el)))
            }
    }, [message]);

    return (
        <>

        <div>
            <h1 className="text-5xl flex justify-center mt-12">{hasAccount ? "Login" : "Register"}</h1>
            <div className="bg-secondary-100 my-20 pt-8 w-10/12 md:max-w-md m-auto md:my-20 md:text-xl flex-col font-lora text-3xl rounded-xl">
                <form className="grid grid-cols-1 p-4 sm:p-1" onSubmit={handleSubmit(onSubmit)}>
                    {hasAccount ? null  : <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" placeholder="FirstName" {...register("firstName",{ required: true })} />
                    }
                    {hasAccount ? null : <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="text" placeholder="LastName" {...register("lastName",{ required: true })} />
                    }
                        <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="text" placeholder="Email" {...register("email",{ required: true })} />

                        <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="password" placeholder="Password" {...register("password", { required: true })} />
                        {errors.exampleRequired && <span className="m-auto">This field is required</span>}

                        <button type="submit" className='bg-[#3b82f6] w-6/6 m-auto text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80'>
                            {hasAccount ? "Login" : "Register"}
                        </button>
                    </form>
                </div>

            </div>
        </>
    );
}