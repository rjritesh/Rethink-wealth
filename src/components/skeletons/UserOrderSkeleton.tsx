import React from 'react'

function UserOrderSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, index) => (
                <div key={index} className="text-white">
                    <div className="text-[12px] md:text-sm bg-gray-900 p-4 rounded-xl shadow-sm overflow-hidden border border-gray-700">
                        <div className='relative animate-pulse'>
                            {/* Order Type Badge Skeleton */}
                            <div className='absolute top-0 right-0'>
                                <div className="h-6 w-16 bg-gray-700 rounded-md animate-pulse"></div>
                            </div>

                            {/* Stock Name Skeleton */}
                            <div className="mb-3 flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                            </div>

                            {/* Quantity Skeleton */}
                            <div className="mb-3 flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 w-12 bg-gray-700 rounded animate-pulse"></div>
                            </div>

                            {/* Price Skeleton */}
                            <div className="mb-3 flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                            </div>

                            {/* Total Amount Skeleton */}
                            <div className="mb-3 flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                            </div>

                            {/* Status Badge Skeleton */}
                            <div className="mb-3 flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-6 w-20 bg-gray-700 rounded-md animate-pulse"></div>
                            </div>

                            {/* Date Skeleton */}
                            <div className="flex items-center">
                                <div className="h-4 w-16 bg-gray-700 rounded mr-2 animate-pulse"></div>
                                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserOrderSkeleton
