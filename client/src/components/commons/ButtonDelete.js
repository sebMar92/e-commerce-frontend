import React from 'react'

export default function ButtonDelete({text = "Delete"}) {
    return (
    <div>
        <button className='bg-[#fd1e1e] text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] shadow-lg shadow-primary-200/80'>
            {text}
        </button>
    </div>
    )
}
