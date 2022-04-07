import React from 'react';

export default function CardSkeleton() {
  return (
    <>
      <div className="w-[12rem] h-[20rem] border-2 rounded-md mx-auto mt-4 animate-pulse">
        <div className="w-6/6 h-32 bg-gray-200" />
        <div className="flex animate-pulse flex-row items-center mt-6 justify-center space-x-5">
          <div className="flex flex-col space-y-3">
            <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
            <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </div>
      </div>
    </>
  );
}
