import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { putBulkOrders } from '../../Redux/Actions/actions'
import NavBarEmpty from '../NavBarEmpty'
import axios from 'axios'


export default function Success() {

  return (
    <>
    <NavBarEmpty />
    <div className='h-[80vh] grid place-items-center'>
    <h1 className='no-underline text-black text-2xl animate-bounce'>Purchase <a className='text-green-600 no-underline'>successful</a>,go to <a href='/' className='decoration-primary-800 text-black'>Home</a></h1>
    </div>
    </>
  )
}
