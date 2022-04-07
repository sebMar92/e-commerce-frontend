import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeOrderStatus, postOrder } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import ModalPortal from "../modals/GuestModal"
import ModalPortalDirections from "../modals/DirectionsModal"

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuyChange({ text = "Buy now", id, status, onClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.home.user);
    const direccion = userInfo.directions;


    const [stateModal, setStateModal] = useState(false)
    function handleCloseModal(e) {
        e.preventDefault()
        setStateModal(!stateModal)
    }

    const [stateDirectionsModal, setStateDirectionsModal] = useState(false)
    function handleCloseDirectionsModal(e) {
        e.preventDefault()
        setStateDirectionsModal(!stateDirectionsModal)
    }

    function handleBuyProduct(e) {
        e.preventDefault()
        const localStorageAccess = window.localStorage.getItem("access")
        const localStorageRefresh = window.localStorage.getItem("refresh")

        if (!localStorageAccess && !localStorageRefresh) {
            handleCloseModal(e)
        }

        if (localStorageRefresh && localStorageAccess) {
            if (direccion && direccion.length) {
                dispatch(
                    changeOrderStatus({
                        status: status,
                        id: id,
                    })
                );
                setTimeout(() => {
                    navigate('/purchase');
                }, 1000);
            } else {
                handleCloseDirectionsModal(e)
            }
        }
    }
    return (
        <div>
            {stateDirectionsModal ? <ModalPortalDirections onClose={(e) => handleCloseDirectionsModal(e)} /> : null}
            {stateModal ? <ModalPortal onClose={(e) => handleCloseModal(e)} /> : null}
            <div>
                <button onClick={(e) => handleBuyProduct(e)} className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80'>
                    {text}
                </button>
            </div>
        </div>
    )
}
