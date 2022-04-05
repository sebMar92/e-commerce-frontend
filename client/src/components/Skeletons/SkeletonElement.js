import React from 'react'
import SkeletonTitle from './SkeletonTitle'

export default function SkeletonElement() {
  return (
    <>
    <div class="w-[30rem] h-[15rem] border-2 rounded-md mx-auto mt-4 animate-pulse">
        <div className='w-6/6 h-32 bg-gray-200' />
  <div class="flex animate-pulse flex-row items-center mt-6 justify-center space-x-5">
    <div class="w-12 bg-gray-300 h-12 rounded-full">
    </div>
        <div class="flex flex-col space-y-3">
        <div class="w-36 bg-gray-300 h-6 rounded-md ">
        </div>
        <div class="w-24 bg-gray-300 h-6 rounded-md ">
        </div>
    </div>
  </div>
</div>
</>
  )
}
