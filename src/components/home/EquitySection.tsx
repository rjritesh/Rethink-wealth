import React from 'react'
import EquityCard from '../shared/EquityCard';
import Link from 'next/link';
import { getStocksByCategory } from '@/services/stock_actions';
import { useQuery } from '@tanstack/react-query';

function EquitySection() {
    const { data: stocks } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getStocksByCategory('HOT PICK')
        
    });
      console.log('DRHP Stocks Data:', stocks)
    return (
        <section className='py-[40px] md:py-[75px]'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <h2 className='text-white text-center text-2xl md:text-5xl leading-[36px] md:leading-[70px] font-bold'>
                    Own These Shares Before They Go Public
                </h2>
                <div className='flex justify-center items-center flex-wrap mt-5 md:mt-10'>
                    {
                        stocks?.map((item) => (
                            <EquityCard item={item} category={item.category} key={item.id} />
                        ))
                    }
                </div>
                <div className='text-center mt-10'>
                    <Link
                        href="/shares"
                        className="rethink-secondary-btn"
                    >
                        Explore Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default EquitySection
