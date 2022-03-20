import React from 'react'

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonCreate({text = "Create Product"}) {
  return (
    <div>
        <button className='bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80 m-3 '>
            {text}
        </button>
    </div>
  )
}
