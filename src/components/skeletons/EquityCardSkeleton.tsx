import React from 'react';

export const EquityCardSkeleton = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='w-[50%] md:w-1/4'>
                    <div className='rounded-lg border border-gray-300 p-4 md:p-4 mx-1 my-2 md:m-3 block hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white'>
                        <div className="animate-pulse">

                            <div className="bg-gray-300 rounded-full w-[50px] h-[50px] mb-3"></div>

                            <div className="bg-gray-300 h-4 w-3/4 rounded mb-3"></div>

                            <div className="mt-2">
                                <div className="bg-gray-300 h-6 w-20 rounded-lg inline-block"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};