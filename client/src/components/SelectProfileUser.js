import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectProfileUser({ title, img, price, id }) {
  return (
    <div className='flex flex-row max-h-30 font-lora gap-2'>

      {id ?
        <Link className='no-underline text-black w-full' to={"/product/" + id}>
          <div className="rounded-md border border-slate-50 hover:border hover:border-primary-400 shadow-sm shadow-slate-400 mb-1 p-1 mr-1 ml-1 flex items-center">
            <img className="w-12 h-12 object-cover rounded-sm" src={img} alt="Img" />
            <div className="ml-2">
              <h1 className='text-xl'>{title}</h1>
              <p className='text-2xl'>${price}</p>
            </div>
          </div>
        </Link>
        : <Link className='no-underline text-black' to={"/purchases"}>
          <div>
            <h1 className='text-xl'>{title}</h1>
            <p className='text-2xl'>${price}</p>
          </div>
        </Link>}
    </div>
  )
}
