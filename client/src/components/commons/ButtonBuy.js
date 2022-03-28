import React from 'react'
import { postOrder } from '../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';


//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuy({ text = "Buy now", id, status, amount,onClick }) {

  const dispatch = useDispatch()

  function handleBuyProduct() {
    dispatch(postOrder({
      status: status,
      amount: amount,
      productId: id
    }))

  }
  return (
    <div>
      <button onClick={() => {handleBuyProduct() ; onClick()}} className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80'>
        {text}
      </button>
    </div>
  )
}
