import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { validateMail } from '../Redux/Actions/actions';
import LoginComponent from './LoginComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailVerification() {
    const { register: register2, handleSubmit, formState: { errors } } = useForm();
    const validation = useSelector(state => state.home.userMail)
    const dispatch = useDispatch()
  //Seteo estados que me ayuden a renderizar condicionalmente

    const [showLogin,setShowLogin] = useState(true)
    const [boolean,setBoolean] = useState(false)

  //Valido la el mail ingresado

  const onSubmit = (data) => {
    console.log(data)
    dispatch(validateMail(data));
  };

  //En la base a la respuesta renderizo un form u otro y seteo los booleanos

  useEffect(() => {
    console.log(validation)
    if (validation.hasOwnProperty('msg')) {
      if (validation.msg.includes("doesn't")) {
        setShowLogin(false);
        setBoolean(false);
      } else {
        setShowLogin(false);
        setBoolean(true);
      }
    }
  }, [validation]);


    //En la base a la respuesta renderizo un form u otro y seteo los booleanos
    const notify = () => {
        toast.error("Write a valid email!", {
            position: toast.POSITION.BOTTOM_LEFT
            })
}

    

    return (
        <>
        <ToastContainer autoClose={2000}/>
        {showLogin ?
    <div className="my-20 pt-8 md:max-w-md md:m-auto md:my-40 md:text-xl flex-col font-lora text-3xl">
            <h1 className='mb-10 text-2xl text-center sm:text-3xl'>Put you mail to register or login</h1>
            <form className="flex" onSubmit={handleSubmit(onSubmit)}>
                    <input className="bg-secondary-100 h-12 my-2 p-1 rounded-md w-full md:m-auto md:mb-2" type="email" placeholder="Email" {...register2("email",{ required: true })} />

                    <button type="submit" className="ml-4 text-2xl text-secondary-200 animate-bounce">></button>
                    
            </form>
    </div>
    :
        <LoginComponent boolean={boolean} />}
        </>
    )
}
