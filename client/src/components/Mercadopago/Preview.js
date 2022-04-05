import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deleteOrder } from '../../Redux/Actions/actions'


export default function Preview({title , id, idOrder, images}) {

    const dispatch = useDispatch()
    const handleDelete = (e) => dispatch(deleteOrder(idOrder, id, "pending"))
  return (
    <div className='bg-secondary-100 rounded-xl flex justify-between'>
        <img className='w-32 h-32 object-cover p-1 rounded-sm' src={images}/>
        <h1 className='font-lora'>{title}</h1>
        <button onClick={handleDelete} className="flex pt-1 pr-1">❌</button>
    </div>
  )
}