import React from 'react'

function UserFieldDetail({ label, detail }: { label: string, detail: string | undefined | null }) {
    return (
        <div className='mb-3'>
            <p className='text-sm font-medium mb-1 text-[#898585]'>
                {label}
            </p>
            <p className='text-[16px] text-white'>
                {detail}
            </p>
        </div>
    )
}

export default UserFieldDetail