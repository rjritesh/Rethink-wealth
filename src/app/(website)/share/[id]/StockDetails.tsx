'use client'
import BuyEquetyCard from '@/components/shares/BuyEquetyCard'
import { StockDetailSkeleton } from '@/components/skeletons/EquityDetailsSkeleton'
import { useStockOperations } from '@/hooks/useStockActions'
import { formatINR } from '@/utils/priceFormet'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import '@/components/RichTextEditor/editor.css'
import dynamic from 'next/dynamic'

const EquityDetails = dynamic(() => import("@/components/shares/EquityDetails"));

function StockDetails() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params?.id : Array.isArray(params?.id) ? params?.id[0] : '';
  const { getStock } = useStockOperations(id);

  const { data: stockData, isLoading } = getStock;

  const changeInPrice = useMemo(() => {
    return Number(stockData?.currentPrice) - Number(stockData?.lastPrice);
  }, [stockData?.currentPrice, stockData?.lastPrice]);

  const percentChangeInPrice = useMemo(() => {
    return (changeInPrice * 100 / Number(stockData?.currentPrice)).toFixed(2);
  }, [changeInPrice, stockData?.currentPrice]);

  const stockDesc = useMemo(() => ({
    name: stockData?.name,
    description: stockData?.description,
    fundamentals: stockData?.fundamentals,
    peerRatio: stockData?.peerRatio,
    shareholding: stockData?.shareholding,
    financials: stockData?.financials
  }), [stockData])

  useEffect(() => {
    if (stockData == null && !isLoading) {
      router.replace('/shares');
    }
  }, [stockData, isLoading, router]);

  return (
    isLoading ? <><StockDetailSkeleton /> </> : (
      <>
        <section className='bg-white text-black py-[40px] md:py-[75px]'>
          <div className='max-w-screen-xl mx-auto px-4 '>
            <div className='flex justify-center items-center flex-wrap'>
              <div className='w-full md:w-2/3'>
                <div className="block">
                  <div className='w-[60px] md:w-[150px]'>
                    {stockData?.imageUrl && <Image src={stockData?.imageUrl} height={75} width={75} className='max-h-[30px] md:max-h-[75px] w-auto' alt='' />}
                  </div>
                  <div className='mt-4'>
                    <h1 className='font-semibold text-[18px] md:text-[36px]'>
                      {stockData?.name}
                    </h1>
                    <p className='text-[13px] md:text-lg font-medium mt-1 md:mt-3'>
                      {stockData?.code} <span className='inline-block text-[12px] md:text-sm ms-4 text-[#827777]'>{stockData?.sector}</span>
                    </p>
                  </div>
                </div>
                <p className='text-black font-medium text-[15px] md:text-[32px] leading-[24px] md:leading-[45px] mt-2 md:mt-3'>
                  {formatINR(Number(stockData?.currentPrice))} <span className={`${changeInPrice < 0 ? 'text-[#FF0D0D]' : 'text-[#099A01]'}`}>
                    {changeInPrice > 0 ? '+' : ''}{changeInPrice.toFixed(2)} ({percentChangeInPrice}%)
                  </span>
                  <span className='inline-block text-[12px] md:text-xl font-medium ms-2 md:ms-4 text-[#9D9A9A]'>
                    1D
                  </span>
                </p>
              </div>
              <div className='w-full md:w-1/3 mt-8 md:mt-0'>
                {stockData && <BuyEquetyCard stockData={stockData} stockId={id} />}
              </div>
            </div>
          </div>
        </section>
        <EquityDetails stockDesc={stockDesc} financialReports={stockData?.financialReports ?? []} />
      </>
    )
  )
}

export default StockDetails