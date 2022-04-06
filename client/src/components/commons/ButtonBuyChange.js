import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeOrderStatus, postOrder } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import ModalPortal from "../modals/GuestModal"

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuyChange({ text = "Buy now", id, status, onClick }) {

    const dispatch = useDispatch()
    const [stateModal, setStateModal] = useState(false)
    function handleCloseModal(e) {
        e.preventDefault()
        setStateModal(!stateModal)
    }

    function handleBuyProduct(e) {
        e.preventDefault()
        const localStorageAccess = window.localStorage.getItem("access")
        const localStorageRefresh = window.localStorage.getItem("refresh")

        if (!localStorageAccess && !localStorageRefresh) {
            handleCloseModal(e)
        }

        if (localStorageRefresh && localStorageAccess) {
            dispatch(
                postOrder({
                    status: status,
                    productId: id,
                })
            );
        }
    }
    return (
        <div> {stateModal ? <ModalPortal onClose={(e) => handleCloseModal(e)} /> : null}
            <div>
                <button onClick={(e) => handleBuyProduct(e) } className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80'>
                    {text}
                </button>
            </div>
        </div>
    )
}
