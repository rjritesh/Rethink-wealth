import React from 'react'

function JoinEliteClub() {
    const cardData = [
        { c_id: 1, c_text: `Private investments are now within reach. Begin your portfolio with as little as ₹10,000.` },
        { c_id: 2, c_text: `Diversification protects your portfolio by reducing risks and boosting resilience.` },
        { c_id: 3, c_text: `Access unique industries beyond markets to expand opportunities and reach.` },
        { c_id: 4, c_text: `Get early access before public launch to maximize returns in a competitive market.` }

    ]
    return (
        <section className='py-[40px] md:py-[75px] bg-white'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <h2 className='text-center text-2xl md:text-5xl leading-[36px] md:leading-[70px] font-bold text-gray-900'>
                    Join the Elite League with <br /> Pre IPO Shares
                </h2>
                <p className='text-gray-900 text-center text-[14px] md:text-xl leading-[22px] md:leading-[30px] font-normal md:font-medium mt-3 md:mt-6 mb-4 md:mb-8'>
                    Explore a curated selection of India&apos;s top private growth companies.
                </p>
                <div className='flex justify-center items-center flex-wrap'>
                    {
                        cardData.map((item) => (
                            <div className=' w-9/10 md:w-4/10 flex justify-center items-center rounded-lg border border-[#121423] p-4 md:p-5 mx-0 my-2 md:m-3' key={item.c_id}>
                                <div>
                                    <p className='text-gray-900 font-normal text-[12px] md:text-[16px] leading-[20px] md:leading-[27px]'>
                                        {item.c_text}
                                    </p>
                                </div>
                                <div className='flex shrink-0 justify-center items-center ms-3 bg-[#3DC475] w-10 h-10 md:w-[56px] md:h-[56px] rounded-[100%]'>
                                    <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-max-10'>
                                        <path d="M9.57431 26.4185L9.41931 26.1544C7.05161 22.1203 0.759784 13.5594 0.69623 13.4734L0.605469 13.3501L2.74906 11.2316L9.53451 15.9697C13.8068 10.4258 17.7926 6.61794 20.3925 4.39431C23.2365 1.96189 25.0878 0.842083 25.1065 0.831353L25.1486 0.806152H28.7847L28.4374 1.11548C19.5046 9.07189 9.82244 25.9825 9.726 26.1524L9.57431 26.4185Z" fill="#FFFFFF" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default JoinEliteClub
