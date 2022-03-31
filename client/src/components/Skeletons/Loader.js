import React from 'react'
import SkeletonElement from './SkeletonElement'
import SkeletonTitle from './SkeletonTitle'

export default function Loader() {
        return (
                <div className='m-auto'>
                        <div className='sm:flex sm:justify-center'>
                        <SkeletonTitle/>
                        </div>
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
                </div>
        )
}
