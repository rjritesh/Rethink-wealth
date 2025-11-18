'use client'
import { EquityCardSkeleton } from '@/components/skeletons/EquityCardSkeleton';
import { getAllStocks } from '@/services/stock_actions';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react'

const EquityCard = dynamic(()=>import("@/components/shared/EquityCard"))

function ManageStocks() {
  const { data: stocks, isLoading } = useQuery({
    queryKey: ['stocks'],
    queryFn: getAllStocks,
  });
  return (
    <section className='bg-white py-[40px] md:py-[70px]'>
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className='flex justify-center items-center flex-wrap'>
          {isLoading ? (
            <EquityCardSkeleton />
          ) : (
            <Suspense fallback={
              <EquityCardSkeleton />
            }>
              {stocks?.map((item) => (
                <EquityCard
                  item={item}
                  key={item.id}
                  prelink='/admin/manage-stocks'
                />
              ))}
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}

export default ManageStocks
