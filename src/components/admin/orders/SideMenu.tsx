'use client'
import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation';

interface SideMenuDataType {
    id: string,
    name: string,
}

function SideMenu({ data, preLink }: { data: SideMenuDataType[], preLink: string }) {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
    return (
        <>
            <ul>
                {
                    data.map((item) => (
                        <li key={item.id} className='border-b border-b-gray-200'>
                            <Link href={`${preLink}/${item.id}`} className={`flex items-center p-2 text-gray-900 ${item.id == id ? 'bg-gray-100' : ''} hover:bg-gray-100 group text-[14px]`}>
                                {item.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SideMenu
