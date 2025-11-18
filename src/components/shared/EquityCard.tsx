import { formatINR } from '@/utils/priceFormet';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'


interface EquityItem {
    id: string | number;
    slug: string,
    imageUrl: string;
    name: string;
    category: string;
    currentPrice: number | string;
    lastPrice: number | string;
}

function EquityCard({ item, category, prelink = '/share' }: { item: EquityItem, category?: string, prelink?: string }) {
    const changeInPrice = (Number(item.currentPrice) - Number(item.lastPrice));
    const changeInPricePercentage = (((Number(item.currentPrice) - Number(item.lastPrice)) / Number(item.lastPrice)) * 100).toFixed(2);
    return (
        <>
            <div key={item.id} className='w-[85%] md:w-1/4'>
                <Link href={`${prelink}/${item.id}`} className='rounded-lg border border-gray-300  p-3 md:p-4 mx-1 my-2 md:m-3 block hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white relative' >
                    {category &&
                        <span className={`text-white font-medium text-[10px] px-2 py-1 absolute right-[-1px] top-4.5 bg-[#FF7700] flex items-center`}>
                            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='inline-block me-1'>
                                <path d="M8.14496 5.46682C7.99713 5.26682 7.81716 5.09348 7.65005 4.92014C7.21941 4.52013 6.73093 4.23345 6.31958 3.81344C5.3619 2.84008 5.14979 1.23337 5.7604 0C5.14979 0.153338 4.61632 0.500014 4.15998 0.880025C2.49528 2.26673 1.83969 4.71347 2.62383 6.81353C2.64954 6.8802 2.67525 6.94686 2.67525 7.03353C2.67525 7.1802 2.57884 7.31354 2.45029 7.36688C2.30246 7.43355 2.1482 7.39354 2.02608 7.28687C1.9896 7.25518 1.95909 7.21675 1.9361 7.17354C1.2098 6.22018 1.09411 4.85347 1.58259 3.76011C0.509215 4.6668 -0.0756782 6.20018 0.00787789 7.64688C0.0464423 7.98023 0.0850066 8.31357 0.194272 8.64691C0.284256 9.04692 0.457796 9.44694 0.650617 9.80028C1.34478 10.9536 2.5467 11.7803 3.83861 11.947C5.21407 12.127 6.68594 11.867 7.74003 10.8803C8.91625 9.77361 9.3276 8.00023 8.72342 6.48018L8.63987 6.30685C8.50489 6.00017 8.14496 5.46682 8.14496 5.46682ZM6.1139 9.66694C5.93394 9.82695 5.63828 10.0003 5.40689 10.067C4.68702 10.3336 3.96715 9.96028 3.54294 9.52027C4.30781 9.3336 4.76415 8.74691 4.89913 8.15357C5.00839 7.62022 4.80271 7.1802 4.71916 6.66686C4.64203 6.17351 4.65488 5.7535 4.82842 5.29348C4.95054 5.54682 5.07909 5.80017 5.23335 6.00017C5.72826 6.66686 6.50597 6.9602 6.67309 7.86689C6.6988 7.96023 6.71165 8.05356 6.71165 8.15357C6.73093 8.70025 6.49955 9.30026 6.1139 9.66694Z" fill="white" />
                            </svg>
                            {category}
                        </span>
                    }
                    <div className='h-[50px] flex items-center'>
                        <Image src={item.imageUrl} height={50} width={50} alt={item.name} className='max-h-[50px] w-auto' />
                    </div>
                    <p className='text-black font-semibold text-[13px] md:text-[16px] leading-[20px] md:leading-[27px] mt-2.5 md:mt-3'>
                        {item.name}
                    </p>
                    <div className='mt-2'>
                        <p className='text-black font-medium text-[12px] md:text-[15px] leading-[22px]'>
                            {formatINR(item.currentPrice)} <span className={`${changeInPrice < 0 ? 'text-[#FF0D0D]' : 'text-[#099A01]'}`}>{changeInPrice > 0 ? '+' : ''}{changeInPrice.toFixed(2)} ({changeInPricePercentage}%)</span>
                        </p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default EquityCard
