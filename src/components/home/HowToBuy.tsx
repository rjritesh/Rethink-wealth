import React from 'react'

function HowToBuy() {
      const cardData = [
        {
            c_id: 1,
            step_heading: "Create an Account on Rethink Wealth",
            step_desc: "Sign up on Rethink Wealth and complete your KYC to get started with your investment journey."
        },
        {
            c_id: 2,
            step_heading: "Select Shares & Fill the Form",
            step_desc: "Browse our curated list of unlisted shares, choose the ones you like, and submit the interest form."
        },
        {
            c_id: 3,
            step_heading: "We'll Reach Out for Processing",
            step_desc: "Our team will contact you shortly to complete the offline process and finalize your purchase."
        }
    ];
  return (
        <section className='py-[40px] md:py-[75px] bg-black'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <h2 className='text-white text-center text-2xl md:text-5xl leading-[36px] md:leading-[70px] font-bold'>
                    How to Buy Unlisted Shares through Rethink Wealth?
                </h2>
                <div className='flex justify-center items-center flex-wrap mt-6 md:mt-10'>
                    {
                        cardData.map((item) => (
                            <div className='w-9/10 md:w-4/10 lg:w-[33.33%]' key={item.c_id}>
                                <div className='rounded-lg p-4 md:p-5 mx-0 my-2 md:m-3 bg-[#141414]'>
                                    <p className='text-white font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[27px] text-center'>
                                        {item.step_heading}
                                    </p>
                                    <p className='text-white font-medium text-[14px] md:text-[16px] leading-[20px] md:leading-[27px] text-center pt-2.5'>
                                        {item.step_desc}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
  )
}

export default HowToBuy
