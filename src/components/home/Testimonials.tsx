import React from 'react'

function Testimonials() {
    const cardData = [
        {
            c_id: 1,
            c_text: `Unlisted shares ke baare mein pehli baar Rethink Wealth se suna. Unki research aur support ne mujhe ek naya investment angle dikhaya.`,
            tName: "Chirag Kuhar",
            tDegination: "Business Owner, Bikaner"
        },
        {
            c_id: 2,
            c_text: `I always thought pre-IPO investing was only for the ultra-wealthy. Rethink Wealth made it accessible and guided me with complete transparency.`,
            tName: "Radhe Dhabas",
            tDegination: "Software Engineer, Mumbai"
        },
        {
            c_id: 3,
            c_text: `"From SIPs in mutual funds to strategic investments in pre-IPO shares, Rethink Wealth has helped me grow my wealth with confidence and clarity.`,
            tName: "Araham Baid",
            tDegination: "Head of Market Research, Singapore"
        }
    ];
    return (
        <section className='py-[40px] md:py-[75px]'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <h2 className='text-white text-center text-2xl md:text-5xl leading-[36px] md:leading-[70px] font-bold'>
                    Hear What Our Customers are Saying
                </h2>
                <div className='flex justify-center items-center flex-wrap mt-6 md:mt-10'>
                    {
                        cardData.map((item) => (
                            <div className='w-9/10 md:w-4/10 lg:w-[33.33%]' key={item.c_id}>
                                <div className='rounded-lg border-2 border-[#3DC475]/70 p-4 md:p-5 mx-0 my-2 md:m-3'>
                                    <p className='text-white font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[27px] italic text-center'>
                                        &quot;{item.c_text}&quot;
                                    </p>
                                    <p className='text-white font-medium text-[14px] md:text-[16px] leading-[20px] md:leading-[27px] text-center pt-2.5'>
                                        {item.tName}
                                    </p>
                                    <p className='text-white font-regular text-[12px] md:text-[14px] leading-[20px] md:leading-[24px] text-center'>
                                        {item.tDegination}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <p className='text-white text-center text-[14px] md:text-xl leading-[22px] md:leading-[30px] font-normal md:font-medium mt-4 md:mt-8 '>
                    Every wealth journey is personal. <br />
                    Rethink Wealth just makes it powerful.
                </p>
            </div>
        </section>
    )
}

export default Testimonials
