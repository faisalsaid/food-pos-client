import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard1() {
  return (
    <div className=" flex flex-row gap-2 w-full ">
      <div className="">
        <Skeleton circle={true} className="h-20 w-20" />
      </div>
      <div className="flex-1">
        <Skeleton className="h-8 w-[75%]" />
        <Skeleton className="" count={3} />
      </div>
    </div>
  );
}

export default SkeletonCard1;
