import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deleteOrder } from '../../Redux/Actions/actions'


export default function Preview({title , id, idOrder, images}) {

    const dispatch = useDispatch()
    const handleDelete = (e) => dispatch(deleteOrder(idOrder, id, "pending"))
  return (
    <div className='bg-primary-800 flex h-40'>
        <img className='w-32 h-32' src={images}/>
        <h1>{title}</h1>
        <button onClick={handleDelete}>Borrar</button>
    </div>
  )
}