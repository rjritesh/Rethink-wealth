'use client';
import Banner from '@/components/shares/Banner';
import dynamic from 'next/dynamic';
import React from 'react'

const Stocks = dynamic(()=>import("@/components/shares/Stocks"))

const Shares = () => {
    return (
        <>
            <Banner />
            <Stocks />
        </>
    )
}

export default Shares;