import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { postEmail, getUsersInfo } from '../Redux/Actions/actions';
import ButtonCreate from './commons/ButtonCreate';
import ButtonDiscard from './commons/ButtonDiscard';

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
    }, [users])

    console.log(receiver)

    const [input, setInput] = useState({
        title: '',
        message: '',
        receivers: []
    });

    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState({});

    function validations(input){
        let error = {};

        if(!input.title){
            error.title = "Subject is required";
        }
        if(!input.message){
            error.message = "Message is required";
        }
        if(!input.receivers){
            error.receivers = "Receivers is required"
        }
        return error;
    }

    function handleSubmit(e){
        e.preventDefault();
        if(error === {}){
            dispatch(postEmail(input));
            setInput({
                title: '',
                message: '',
                receivers: []
            });

            alert("Email sent!")
        } else {
            alert("Please, fill in all the fields")
        }
    };

    function handleNewEmail(e){
        const { value } = e.target;
        setNewEmail(value);
    }

    function handleSubmitNewEmail(e){
        if(newEmail !== ''){
            setInput({
                ...input,
                receivers: [...input.receivers, newEmail]
            });
            setNewEmail('');
        }
    }

    function handleChangeInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
            });

        setError(
            validations({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
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
        e.preventDefault();
        setInput({
            ...input,
            receivers: input.receivers.filter(name => name !== e.target.id)
        });
    }

    return (
        <>
            <NavBarEmpty/>
                <div className='sm:flex' >
                    <NavbarAdmin className="dark:text-black" />
                                    <form onSubmit={(e) => handleSubmit(e)} className="bg-secondary-100 dark:bg-slate-700 dark:text-white">
                                        <br />
                                        <h2 className="text-center">Edit Newsletter</h2>
                                        <br />
                                        <hr />
                                        <div>
                                            <div className="justify-center p-2">
                                                <label>Subject</label>
                                                <br/>
                                                <input
                                                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                                                    type='text'
                                                    value={input.title}
                                                    name='title'
                                                    onChange={(e) => handleChangeInput(e)}
                                                    autoComplete="off"
                                                />
                                                <strong>{error.title}</strong>
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
                                                <strong >{error.message}</strong>
                                            </div>
                                        </div>

                                        <div className="justify-center p-2">
                                            <label>Receivers</label>
                                            <select className='rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50'
                                            onChange={(e) => handleSelect(e)}>
                                                <option value="All">All</option>
                                                    {receiver.length > 0 && receiver.map((rec) => {
                                                    return(
                                                        <option id={rec} key={rec}>{rec}</option>
                                                    )
                                                })}
                                                
                                            </select>
                                            <div className='flex'>
                                                <input
                                                    className="rounded-md h-8 w-full hover:bg-secondary-100 border-2 border-gray-300 bg-gray-50"
                                                    type='text'
                                                    placeholder="Add Email..."
                                                    value={newEmail}
                                                    name='email'
                                                    onChange={(e) => handleNewEmail(e)}
                                                    autoComplete="off"
                                                />
                                                <button 
                                                    type="button"
                                                    className="text-secondary-200 bg-secondary-100 p-1 ml-1 rounded-md "
                                                    onClick={(e) => handleSubmitNewEmail(e)}>
                                                        Add
                                                </button>
                                            </div>

                                            {input.receivers && input.receivers.map(rec => 
                                                <div className="flex w-full hover:bg-secondary-100 bg-gray-50" key={rec} value={rec}>
                                                    <button type='button' id={rec} onClick={(e) => handleDelete(e)}>{rec}</button>
                                                </div>
                                            )}
                                            
                                            <strong >{error.receivers}</strong>
                                        </div>
                                        <ButtonCreate 
                                        disabled={error?.disabledSubmit}
                                        text="Send Email"
                                        type="submit"
                                        />
                                        <ButtonDiscard/>
                                    </form>
                                <div className="w-full bg-secondary-100 dark:bg-slate-700"> 
                                    < br />
                                    <h2 className="text-center dark:bg-slate-700 dark:text-white">Preview</h2>
                                    <br />
                                    <hr />
                    </div>          
                </div>
            </>
        );
}