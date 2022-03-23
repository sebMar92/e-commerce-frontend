import React,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import { useSelector,useDispatch } from 'react-redux';
import { validateMail } from '../Redux/Actions/actions';
import LoginComponent from './LoginComponent';

export default function EmailVerification() {
    const { register: register2, handleSubmit, formState: { errors } } = useForm();
    const validation = useSelector(state => state.home.userMail)

    //Seteo estados que me ayuden a renderizar condicionalmente

    const [showLogin,setShowLogin] = useState(true)
    const [boolean,setBoolean] = useState(false)
    const dispatch = useDispatch()

    //Valido la el mail ingresado

    const onSubmit = data =>{
        dispatch(validateMail(data))
    }

    //En la base a la respuesta renderizo un form u otro y seteo los booleanos


    useEffect(() => {
        if(validation.hasOwnProperty("msg")){
            if(validation.msg.includes("doesn't")){
                setShowLogin(false)
                setBoolean(false)
                alert(validation.msg,boolean)
            }else{
                setShowLogin(false)
                setBoolean(true)
                alert(validation.msg,boolean)
            }
        }
    }, [validation]);

    return (
        <>
        {showLogin ?
    <div className="my-20 pt-8 md:max-w-md md:m-auto md:my-40 md:text-xl flex-col font-lora text-3xl">
            <h1 className='mb-10 text-3xl'>Put you mail to register or login</h1>
            <form className="flex" onSubmit={handleSubmit(onSubmit)}>
                    <input className="bg-secondary-100 h-12 my-2 p-1 rounded-md md:w-5/6 md:m-auto md:mb-2" type="email" placeholder="Email" {...register2("email",{ required: true })} />
                    <button type="submit" className="text-2xl text-secondary-200 animate-bounce">></button>
            </form>
    </div>
    :
        <LoginComponent boolean={boolean} />}
        </>
    )
}
