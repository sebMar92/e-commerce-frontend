import React from 'react'
import SkeletonElement from './SkeletonElement'

export default function Loader() {
        return (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-20 sm:m-auto 2xl:grid-cols-2 2xl:gap-30">
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
         <SkeletonElement />
        </div>
        </>
        )
}
