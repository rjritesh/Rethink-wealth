import Link from 'next/link'
import React from 'react'

function RethinkWealth() {
    return (
        <section className='py-[40px] md:py-[75px] bg-white '>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <p className='text-center text-xl md:text-[40px] font-bold text-gray-900'>
                    It&apos;s about time you
                </p>
                <p className='text-center text-3xl md:text-[75px] font-bold text-gray-900 mb-7 mt-4 md:mb-14 md:mt-8'>
                    Rethink Wealth
                </p>
                <div className='text-center'>
                    <Link
                        href="/shares"
                        className="rethink-primary-btn"
                    >
                        Explore Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default RethinkWealth
