import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({placeholder = "Search..." }) {
  return (
        <div className='flex justify-center font-lora'>
            <input
            className='bg-secondary-100 p-2 h-8 rounded-md w-10/12 md:w-4/12 focus:outline-none' 
            placeholder={placeholder}
            />
            <button className='text-secondary-200 bg-secondary-100 p-1 ml-1 rounded-md active:translate-y-1'>
              <AiOutlineSearch />
            </button>
        </div>
  )
}
