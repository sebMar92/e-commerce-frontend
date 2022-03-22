import React,{useState} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import ButtonBuy from '../components/commons/ButtonComplete'
import {useSelector,useDispatch} from 'react-redux'
import { loginUser, postNewUser,validateMail } from "../Redux/Actions/actions"
import LoggedModal from "./modals/LoggedModal"

export default function LoginComponent() {
    const dispatch = useDispatch()
    const message = useSelector(state => state.home.userTokens)
    const mailRes = useSelector(state => state.home.userMail)
    let navigate = useNavigate();
    const [hasAccount,setHasAccount] = useState(false)
    const [isVerified,setIsVerified] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {register: register2,formState: { errors: errors2 },handleSubmit: onSubmit2} = useForm();

    const onSubmit = data => {
        if(hasAccount){
        dispatch(postNewUser(data))
        alert("Succesfully registered")
        setHasAccount(false)
    }else{
        dispatch(loginUser(data))
        alert("Logged in")
        navigate("/")
    }
};

    const onSubmitMail = data =>{
        setIsVerified(true)
    };

    return (
        <div>
            <h1 className="text-5xl flex justify-center mt-12">{isVerified ? "Login" : "Please put your email to login or create an account"}</h1>
            {isVerified ? 
            //Login And Register Form
            <div className="bg-secondary-100 my-20 pt-8 md:max-w-md md:m-auto md:my-20 md:text-xl flex-col font-lora text-3xl">
                <form className="grid grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
                    {hasAccount ?  <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" placeholder="FirstName" {...register("firstName",{ required: true })} /> : null
                    }

                    {hasAccount ? <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="text" placeholder="LastName" {...register("lastName",{ required: true })} /> : null
                    }

                    <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="email" placeholder="Email" {...register("email",{required: true })} />
                    {errors.example && <span className="m-auto">This field is required</span>}

                    <input className="h-12 my-2 md:w-5/6 md:m-auto md:mb-2" type="password" placeholder="Password" {...register("password", { required: true })} />
                    {errors.exampleRequired && <span className="m-auto">This field is required</span>}
                    
                    <button type="submit" className='bg-[#3b82f6] w-6/6 m-auto text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80'>
                        {hasAccount ? "Register" : "Login"}
                    </button>
                </form>
            </div>
            :  
            //Second Form
            <div className="my-20 pt-8 md:max-w-md md:m-auto md:my-20 md:text-xl flex-col font-lora text-3xl">
                <form className="flex" onSubmit={handleSubmit(onSubmitMail)}>
                    <input className="bg-secondary-100 h-12 my-2 p-1 rounded-md md:w-5/6 md:m-auto md:mb-2" type="email" placeholder="Email" {...register2("email",{required: true })} />
                    {errors.example && <span className="m-auto">This field is required</span>}
                    <button type="submit" className="text-2xl text-secondary-200">></button>
                </form>
                </div>
            }
        </div>
    );
}