import React from 'react'
import { useDispatch } from 'react-redux';
import {changeOrderStatus} from '../../Redux/Actions/actions';


//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuyChange({ text = "Buy now", id, status, onClick }) {

    const dispatch = useDispatch()
 /*    console.log(id, status) */
    function handleBuyProduct() {
        dispatch(changeOrderStatus({
            status: status,
            id: id
        }))

    }
    return (
        <div>
            <button onClick={() => { handleBuyProduct()}} className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80'>
                {text}
            </button>
        </div>
    )
}
