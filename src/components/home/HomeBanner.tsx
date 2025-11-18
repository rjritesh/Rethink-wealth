import Image from 'next/image'
import React from 'react'

function HomeBanner() {
    return (
        <section className="bg-custom-diagonal py-10 md:py-15 lg:pb-[75px]">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center relative">
                <div className="md:w-1/2 text-white space-y-6 text-center md:text-left order-2 md:order-1">
                <div className='block md:hidden text-center'>
                        <Image
                            src="/images/rethink_wealth_banner_img_mobile.webp"
                            width={300}
                            height={244}
                            alt="Banner"
                            className="max-w-full w-[300px] h-[244px] mx-auto"
                            loading='lazy'
                        />
                    </div>
                    <h1 className="text-3xl md:text-[70px] md:leading-[70px] font-bold m-0">
                        Invest Beyond <br />
                        the Ordinary.
                    </h1>
                    <p className="text-[14px] leading-[24px] md:text-[24px] md:leading-[30px] font-normal md:font-medium mt-4 mb-2 md:mt-7 md:mb-10 ">
                        Because your investments deserve more than just a thought, they deserve intention, insight, and a strategy built around what truly matters to you.
                    </p>
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0 justify-center order-2 md:order-2 hidden md:flex">
                    <Image
                        src="/images/rethink_wealth_banner_img_mobile.webp"
                        width={412}
                        height={500}
                        alt="Banner"
                        className="max-w-full w-[175px] h-[170px] md:h-[500px] md:w-[412px]"
                        loading='lazy'
                    />

                </div>
            </div>
        </section>
    )
}

export default HomeBanner
