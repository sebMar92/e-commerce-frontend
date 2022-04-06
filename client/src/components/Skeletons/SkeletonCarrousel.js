import React from 'react'
import CardSkeleton from './CardSkeleton'
import SkeletonArrow from './SkeletonArrow'
import SkeletonTitle from './SkeletonTitle'

export default function SkeletonCarrousel() {
        return (
                <div className='md:my-[10rem]'>
                <div class="sm:w-[55rem] h-16 bg-gray-200 animate-pulse mt-3 m-auto rounded-xl">
                </div>
                <div className='grid grid-cols-6 mx-20'>
                        <SkeletonArrow />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                        <SkeletonArrow boolean={true}/>
                </div>
                </div>
        )
}