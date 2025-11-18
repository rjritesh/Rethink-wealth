import React from 'react'

function Skeleton({className}:{className:string}) {
  return (
    <div className={`${className} skeleton-pulse bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200 `}></div>
  )
}

export default Skeleton
