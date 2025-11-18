import React from 'react'

function UserProfileSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="mb-3 animate-pulse">
                    {/* Label skeleton */}
                    <div className="h-4 w-24 bg-gray-700 rounded mb-1"></div>
                    {/* Detail skeleton */}
                    <div className="h-5 w-3/4 bg-gray-600 rounded"></div>
                </div>
            ))}
        </div>
    )
}

export default UserProfileSkeleton
