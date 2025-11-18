'use client'
import { FinancialReport, StockDescription } from '@/types/stock.types';
import Link from 'next/link';
import React, { useState } from 'react'
import HtmlContent from './HtmlContent';

function EquityDetails({ stockDesc, financialReports }: { stockDesc: StockDescription, financialReports: FinancialReport[] }) {
    const [section, setSection] = useState<number>(1);

    return (
        <section className='bg-gray-50 text-black py-[40px] md:py-[75px] border-t border-[#f0f2f7]'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <div className='flex items-center flex-wrap'>
                    <div className='text-center'>
                        <button className={`text-center ${section == 1 ? "text-[#14438B]" : "text-black"} ${section == 1 ? "bg-[#14438B]/8" : ""} md:px-4 px-3 font-medium rounded-lg text-sm md:text-[16px] lg:px-5 py-2 lg:py-2 cursor-pointer`} onClick={() => setSection(1)}>
                            Company Overview
                        </button>
                    </div>
                    <div className='text-center'>
                        <button className={`text-center ${section == 2 ? "text-[#14438B]" : "text-black"} ${section == 2 ? "bg-[#14438B]/8" : ""} md:px-4 px-3 font-medium rounded-lg text-sm md:text-[16px] lg:px-5 py-2 lg:py-2 cursor-pointer`} onClick={() => setSection(2)}>
                            Financials
                        </button>
                    </div>
                </div>
                <div className='mt-10'>
                    <div className='text-black text-sm md:text-[16px]'>
                        {
                            section == 1 &&
                            <>
                                <div className='w-full md:w-[85%] lg:w-[80%] xl:w-[75%]'>
                                    {stockDesc?.description &&
                                        <div className='mb-6 md:mb-8'>
                                            <p className='text-2xl font-semibold mb-4'>
                                                Company Overview
                                            </p>
                                            <HtmlContent htmlString={stockDesc.description} />
                                        </div>
                                    }

                                    {stockDesc?.fundamentals &&
                                        <div className='mb-6 md:mb-8 p-4 md:p-6 bg-white border border-gray-200 rounded-lg'>
                                            <p className='text-lg md:text-3xl font-semibold mb-4'>
                                                Fundamentals
                                            </p>
                                            <div className='overflow-x-scroll'>
                                                <HtmlContent htmlString={stockDesc.fundamentals} />
                                            </div>

                                        </div>}

                                    {stockDesc?.financials &&
                                        <div className='mb-6 md:mb-8 p-4 md:p-6 bg-white border border-gray-200 rounded-lg'>
                                            <p className='text-lg md:text-3xl font-semibold mb-4'>
                                                Financials
                                            </p>
                                            {
                                                stockDesc.financials.balance_sheet &&
                                                <div className='mb-8'>
                                                    <p className='text-[16px] md:text-xl font-semibold mb-3.5'>
                                                        Balance Sheet
                                                    </p>
                                                    <div className='overflow-x-scroll'>
                                                        <HtmlContent htmlString={stockDesc.financials.balance_sheet} />
                                                    </div>
                                                </div>
                                            }
                                            {
                                                stockDesc.financials.income_statement &&
                                                <div className='mb-8'>
                                                    <p className='text-[16px] md:text-xl font-semibold mb-3.5'>
                                                        Income Statement
                                                    </p>
                                                    <div className='overflow-x-scroll'>
                                                        <HtmlContent htmlString={stockDesc.financials.income_statement} />
                                                    </div>
                                                </div>
                                            }
                                            {
                                                stockDesc.financials.cash_flow &&
                                                <div>
                                                    <p className='text-[16px] md:text-xl font-semibold mb-3.5'>
                                                        Cash Flow
                                                    </p>
                                                    <div className='overflow-x-scroll'>
                                                        <HtmlContent htmlString={stockDesc.financials.cash_flow} />
                                                    </div>
                                                </div>
                                            }
                                        </div>}

                                    {stockDesc?.peerRatio &&
                                        <div className='mb-6 md:mb-8 p-4 md:p-6 bg-white border border-gray-200 rounded-lg'>
                                            <p className='text-lg md:text-3xl font-semibold mb-4'>
                                                Peer comparison
                                            </p>
                                            <div className='overflow-x-scroll'>
                                                <HtmlContent htmlString={stockDesc.peerRatio} />
                                            </div>
                                        </div>
                                    }

                                    {stockDesc?.shareholding &&
                                        <div className='mb-6 md:mb-8 p-4 md:p-6 bg-white border border-gray-200 rounded-lg'>
                                            <p className='text-lg md:text-3xl font-semibold mb-4'>
                                                Shareholding Pattern
                                            </p>
                                            <div className='overflow-x-scroll'>
                                                <HtmlContent htmlString={stockDesc.shareholding} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>

                        }
                        {
                            section == 2 &&
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                                {
                                    financialReports?.map((item) => (
                                        <div className='flex justify-between items-center border border-gray-300 rounded-xl p-3 md:p-4 lg:p-5 hover:shadow-lg transition-all duration-300' key={item.reportName}>
                                            <div>
                                                <Link href={item.reportLink} target='_blank'>
                                                    <svg className='w-[32px] md:w-[44px]' width="44" height="53" viewBox="0 0 44 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.9458 51.2813H33.6917C36.2005 51.2813 38.6066 50.2846 40.3806 48.5106C42.1546 46.7366 43.1512 44.3306 43.1512 41.8218V26.8758C43.1521 24.3674 42.1566 21.9612 40.3836 20.1867L24.2512 4.05152C23.3727 3.17315 22.3299 2.47641 21.1821 2.00109C20.0344 1.52576 18.8043 1.28116 17.562 1.28125H10.9458C8.43698 1.28125 6.03093 2.27787 4.25694 4.05186C2.48295 5.82585 1.48633 8.23191 1.48633 10.7407V41.8218C1.48633 44.3306 2.48295 46.7366 4.25694 48.5106C6.03093 50.2846 8.43698 51.2813 10.9458 51.2813Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0966 13.1473C17.4506 13.3581 17.0371 13.7851 16.9182 14.2581C16.6749 15.2095 16.9182 16.2311 17.602 17.5095C17.9425 18.1419 18.3587 18.7824 18.8182 19.4689L19.0668 19.8392L19.4587 20.4203L19.5101 20.2365L19.7425 19.4095C20.0092 18.5032 20.2164 17.5842 20.3641 16.6527C20.6047 14.9176 20.3344 13.9014 19.529 13.2473C19.3128 13.0716 18.7777 12.9257 18.0966 13.1473ZM18.2452 24.3689L17.5155 23.3906L17.429 23.2608C17.1182 22.7473 16.7722 22.2338 16.3966 21.6797L16.1263 21.277C15.629 20.554 15.1672 19.8072 14.7425 19.0392C13.9047 17.477 13.2344 15.5635 13.7749 13.4527C14.2344 11.6581 15.6614 10.5311 17.0912 10.0635C18.4885 9.60947 20.2641 9.66623 21.5777 10.7311C23.7182 12.4716 23.8695 14.9824 23.5749 17.1014C23.4108 18.1736 23.1752 19.2336 22.8695 20.2743L22.6101 21.1933C22.4083 21.8815 22.2209 22.5743 22.0479 23.2716L21.8668 23.796L25.629 28.8338C27.3858 28.623 29.3155 28.496 31.1155 28.6257C33.1939 28.7716 35.4263 29.2797 36.9479 30.723C37.4375 31.231 37.7918 31.8537 37.9783 32.5342C38.1648 33.2146 38.1776 33.9309 38.0155 34.6176C37.6993 35.9149 36.7885 36.996 35.5317 37.6527C32.8695 39.0446 30.3912 37.9365 28.5506 36.5284C27.1101 35.4284 25.7263 33.8933 24.5614 32.6014L24.2804 32.2933C23.2804 32.4473 22.3344 32.6203 21.5668 32.7662C20.7425 32.9203 19.7182 33.1122 18.6047 33.3608L18.1966 34.5581C17.9713 35.077 17.7569 35.5996 17.5533 36.1257L17.2236 36.9446C16.8909 37.7878 16.5054 38.6093 16.0695 39.4041C15.1777 40.9662 13.7533 42.6257 11.3641 42.7581C8.16414 42.9365 5.99657 40.096 6.61819 37.0608L6.63441 36.9879C7.17495 34.85 9.05063 33.4473 10.8641 32.5203C12.4777 31.6933 14.3614 31.0824 16.1101 30.6257L18.2452 24.3689ZM20.5966 27.5176L19.8209 29.796L20.9587 29.5797L20.9695 29.577L21.9966 29.3878L20.5966 27.5176ZM28.2722 31.8527C29.0128 32.6365 29.7506 33.3662 30.5182 33.9527C32.0047 35.0879 33.0587 35.2851 34.029 34.777C34.5695 34.4933 34.7966 34.1257 34.8641 33.8527C34.8969 33.7063 34.8944 33.5543 34.8568 33.4091C34.8192 33.2639 34.7476 33.1297 34.6479 33.0176C33.9533 32.4014 32.6966 31.9906 30.8858 31.8608C30.0155 31.8054 29.1428 31.8027 28.2722 31.8527ZM14.7452 34.4122C13.8858 34.7068 13.0695 35.0338 12.3398 35.4068C10.7533 36.2176 9.98846 37.0392 9.78846 37.75C9.57765 38.8716 10.3074 39.5689 11.1831 39.5203C11.9128 39.4797 12.5506 39.023 13.2533 37.7933C13.6209 37.123 13.9434 36.432 14.2209 35.7203L14.5101 35.0014L14.7452 34.4122Z" fill="black" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            <div className='text-center ms-2 md:ms-4 text-[12px] md:text-sm font-medium'>
                                                <Link href={item.reportLink} className='block' target='_blank'>{item.reportName}</Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EquityDetails