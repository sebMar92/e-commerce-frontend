import React from 'react'

export default function SkeletonArrow({boolean}) {
    const bool = boolean && boolean
    console.log(boolean)
  return (
      <>
      {bool ?
    <div className='flex animate-pulse flex-row items-center mt-6 justify-center text-4xl text-secondary-200/70'>{">"}</div>
    : 
    <div className='flex animate-pulse flex-row items-center mt-6 justify-center text-4xl text-secondary-200/70'>{"<"}</div>}
    </>
  )
}
