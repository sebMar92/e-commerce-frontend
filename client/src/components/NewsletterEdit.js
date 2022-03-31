import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { postEmail, getUsersInfo } from '../Redux/Actions/actions';

export default function NewsletterEdit() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.home.users)
    console.log(users)
    useEffect(() => {
        dispatch(getUsersInfo());
    }, [dispatch]);

    const [receiver, setReceiver] = useState([]);

    useEffect(() => {    
        users.length  && (
            users.map(user => receiver.push(user.email))
            )
            setReceiver([...new Set(receiver)])
            console.log("r",receiver)
    }, [users])

    console.log(receiver)

    const [input, setInput] = useState({
        title: '',
        message: '',
        receivers: []
    })

    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState({});

    const validations = function(input){
        const error = {};

        if(!input.title){
            error.title = "Title is required";
        }
        if(!input.message){
            error.message = "Message is required";
        }
        if(!input.receivers){
            error.receivers = "Receivers is required"
        }
        return error;
    }

    function handleChangeInput(e){
        e.preventDefault();
        setInput(input =>{
            const newInput = {
                ...input,
                [e.target.name] : e.target.value
            }
        const error = validations(newInput);
        setError(error);
        return newInput;
        })
    }

    function handleSelect(e){
        var selectAll = true;
        if (e.target.value === "All"){
            if(selectAll){
                setInput({
                    ...input,
                receivers: [...receiver]
                })
                selectAll = false;
            }
        } else {
            if(!selectAll){

            } else {
                setInput({
                    ...input,
                    receivers: [...new Set([...input.receivers, e.target.value])]
                });
            }
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            receivers: input.receivers.filter(rec => rec !== e)
        });
    }

    function handleNewEmail(e){
        e.preventDefault();
        setNewEmail(e.target.value)
    }

    function handleSubmitNewEmail(e){
        e.preventDefault();
        if(newEmail){
            setInput({
                ...input,
                receivers: [...input.receivers, newEmail]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.title && input.message && input.receivers){
            dispatch(postEmail(input));
            alert("Email sent!")
            setInput({
                title: '',
                message: '',
                receivers: []
            });
        } else {
            alert("Please, fill in all the fields")
        }
    };

    return (
        <>
            <NavBarEmpty/>
                <div className='grid sm:grid-cols-[13rem_minmax(200px,_1fr)]' >
                    <NavbarAdmin />
                        <div className='flex justify-center bg-secundary-300'>
                            <div className="flex justify-around p-2 w-full m-11">  
                                <div className="flex bg-gray-50  min-w-min max-w-sm m-2 rounded-md justify-center p-8">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <h2 className="justify-center">Edit Newsletter</h2>
                                            <div>
                                                <div className="justify-center p-2">
                                                    <label>Title</label>
                                                        <br/>
                                                        <input
                                                            className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                                                            type='text'
                                                            value={input.title}
                                                            name='title'
                                                            onChange={(e) => handleChangeInput(e)}
                                                            autoComplete="off"
                                                            />
                                                        {error.title && <strong className='err'>{error.title}</strong>}
                                                </div>
                                        
                                                <div className="justify-center p-2">
                                                    <label>Message</label>
                                                        <br/>
                                                        <textarea
                                                            className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                                                            type='text'
                                                            name='message'
                                                            overflow='auto'
                                                            value={input.message}
                                                            onChange={(e) => handleChangeInput(e)}
                                                            autoComplete="off"
                                                            />
                                                        {error.message && <strong className='err'>{error.message}</strong>}
                                                </div>
                                            </div>
                                                <div className="justify-center p-2">
                                                    <label>Receivers</label>
                                                        <br/>
                                                        <div>
                                                            <input
                                                                className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                                                                type='text'
                                                                value={newEmail}
                                                                name='email'
                                                                onChange={(e) => handleNewEmail(e)}
                                                                autoComplete="off"
                                                            />
                                                            <button 
                                                                type="button"
                                                                className="text-secondary-200 bg-secondary-100 p-1 ml-1 rounded-md "
                                                                onClick={(e) => handleSubmitNewEmail(e)}>
                                                                    Add email
                                                            </button>
                                                        </div>
                                                <select className='rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50'
                                                onChange={(e) => handleSelect(e)}>
                                                    {/* <option>Select</option> */}
                                                    {receiver.length &&
                                                    <option value="All" >All</option>
                                                        }
                                                        {receiver.length && receiver.map((rec) => {
                                                        return(
                                                            <option key={rec}>{rec}</option>
                                                        )
                                                    })}
                                                    
                                                </select>
                                                <div>
                                                    {input.receivers.map(rec => 
                                                        <div key={rec} value={rec}>
                                                            <h3>{rec}</h3>
                                                            <button onClick={() => handleDelete(rec)}>X</button>
                                                        </div>
                                                    )}
                                                </div>
                                                {error.receivers && <p className='err'>{error.receivers}</p>}
                                            </div>
                                        <div>
                                            <div className="sm:justify-center">
                                                <button className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80 m-3 ' type='submit' disabled={Object.keys(error).length > 0 ? true : false}>Send email</button>
                                                <Link to='/admin'><button className='bg-[#fd1e1e] text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] shadow-lg shadow-primary-200/80'>Cancel</button></Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="sm:hidden lg:flex z-10 hidden w-full">
                                    <div className="w-full p-2 bg-white rounded shadow-sm mx-6 my-2 ">
                                        <div className="p-2 border-b-[1px] border-b-primary-300 font-lora">
                                            <h2 className="2xl:text-2xl">{input.title}</h2>
                                        </div>
                                    </div>   
                                <div  className="flex justify-center">
                                    <div className='flex-col items-center'>
                                        <h2 className="p-2 font-lora">{input.message}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
}