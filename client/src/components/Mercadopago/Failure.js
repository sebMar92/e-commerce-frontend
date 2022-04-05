import React from 'react'
import NavBarEmpty from '../NavBarEmpty'

export default function Failure() {
  return (
    <>
    <NavBarEmpty />
    <div className='h-[80vh] grid place-items-center'>
    <h1 className='no-underline text-black text-2xl animate-bounce'>Your paiment is <a className='text-yellow-500 no-underline'>pending</a>,go to <a href='/' className='decoration-primary-800 text-black'>My purchases</a></h1>
    </div>
    </>
  )
}
