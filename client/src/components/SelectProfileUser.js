import React from 'react'
import { Link } from 'react-router-dom'

export default function SelectProfileUser({title, img, price,id}) {
  return (
    <div className='flex flex-row max-h-30 font-lora gap-2'>
        <img className="w-12 h-12 object-cover" src={img} alt="Img" />
        {id ? 
          <Link className='no-underline text-black' to={"/product/" + id}>
            <div>
                <h1 className='text-xl'>{title}</h1>
                <p className='text-2xl'>${price}</p>
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
