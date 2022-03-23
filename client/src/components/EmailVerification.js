import React,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import { useSelector,useDispatch } from 'react-redux';
import { validateMail } from '../Redux/Actions/actions';
import LoginComponent from './LoginComponent';

export default function EmailVerification() {
    const validation = useSelector(state => state.home.userMail)
    const dispatch = useDispatch()
    const [boolean,setBoolean] = useState()
    const { register: register2, handleSubmit, formState: { errors } } = useForm();
    console.log(validation.msg)

    const onSubmit = data =>{
        dispatch(validateMail(data))
    }
    useEffect(() => {
        if(validation.hasOwnProperty("msg")){
            if(validation.msg.includes("doesn't")){
                setBoolean(false)
                alert(validation.msg)
            }else{
                setBoolean(true)
                alert(validation.msg)
            }
        }
    }, [validation]);

    return (
        <>
    <div className="my-20 pt-8 md:max-w-md md:m-auto md:my-20 md:text-xl flex-col font-lora text-3xl">
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
                <input className="bg-secondary-100 h-12 my-2 p-1 rounded-md md:w-5/6 md:m-auto md:mb-2" type="email" placeholder="Email" {...register2("email",{ required: true })} />
                <button type="submit" className="text-2xl text-secondary-200">></button>
        </form>
    </div>
    </>
    )
}
