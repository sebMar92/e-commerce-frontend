import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from "react-icons/ai"

function onClickitems(){
  document.getElementById("items").classList.toggle("hidden")
}

export default function  NavbarAdmin({name, idUser}){
  return(    
    <div className='sm:w-60 mt-5'>
      <div className='bg-primary-500 text-decoration-line: no-underline font-medium text-lg px-25 py-5 text-slate-900 flex justify-center rounded'>
        <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base mt-3 mb-3">Welcome, Cosme Fulanito{name}!</p>
      </div>
        <div className="text-center sm:hidden">
          <button className="text-primary-600" onClick={onClickitems}>
            <AiOutlineCaretDown/>
          </button>
        </div>
      <div id='items' className='hidden sm:block'>
        <Link to={`/admin/${idUser}`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Statistics</p>
          </div>
        </Link>
        <Link to={`/admin/products`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">List of products</p>
          </div>
        </Link>
        <Link to={`/admin/create/Product`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Create products</p>
          </div>
        </Link>
        <Link to={`/admin/edit/:idProduct`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Edit products</p>
          </div>
        </Link>
        <Link to={`/admin/orders`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">List of orders</p>
          </div>
        </Link>
        <Link to={`/admin/users`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Users</p>
          </div>
        </Link>
        <Link to={`/admin/discounts`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Discounts</p>
          </div>
        </Link>
        <Link to={`/admin/newsletter`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Newsletter</p>
          </div>
        </Link>
        <Link to={`/`} className="no-underline">
          <div className='m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400'>
            <p className="font-semibold tracking-tight h-8 text-gray-900 dark:text-white text-base">Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
}