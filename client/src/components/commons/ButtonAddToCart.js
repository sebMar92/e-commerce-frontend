import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postOrder, getOrder } from '../../Redux/Actions/actions';
import ModalPortal from "../modals/GuestModal"
import { ToastContainer, toast } from 'react-toastify';

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonAddToCart({ text = "Add to cart", id, status }) {

    const inCart = useSelector((state) => state.home.inCart)
    const postOrders = useSelector((state) => state.home.postOrders)
    const deleted = useSelector((state) => state.home.deleted)
    const [found, setFound] = useState(false)
    const token = window.localStorage.getItem("access")

    useEffect(() => {
        dispatch(getOrder({status: "inCart"}))
    }, [postOrders, deleted])

    useEffect(() => {
        const prodFound = inCart && inCart.length > 0 && inCart.find(el => el.id === id)
        if(prodFound) {
            setFound(true)
        } else {
            setFound(false)
        }
    }, [inCart])

    const addToCart = () => {
        if(token) {
        toast.success('Added to the cart !', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
    }

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
        <div> 
            {stateModal ? <ModalPortal onClose={(e) => handleCloseModal(e)} /> : null}
            {found ? 
            <div>
                <p className="bg-primary-500  p-2 rounded-md text-lg font-lora font-bold ">
                    Added to the cart
                </p>
            </div>
            : <div>
                <button onClick={(e) => {handleBuyProduct(e); addToCart()} } className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80'>
                    {text}
                </button>
              </div>
            }
        </div>
    )
}
