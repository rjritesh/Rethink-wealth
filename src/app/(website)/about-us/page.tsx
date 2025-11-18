import { Instagram, Linkedin, Twitter } from '@/components/ui/SocialMediaIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function AboutUs() {
    return (
        <>
            <section className='py-[40px] md:py-[100px] bg-share-banner-gradient'>
                <div className='px-4 max-w-screen-xl mx-auto'>
                    <h1 className='m-0 text-center text-white text-[28px] md:text-[50px] font-semibold'>
                        Not just what you invest in. <br />
                        Rethink why you invest.
                    </h1>
                </div>
            </section>
            <section>
                <div className='px-4 max-w-screen-xl mx-auto'>
                    <div className='w-full md:w-[85%] lg:w-[75%] mx-auto text-white text-sm md:text-[16px]'>
                        <p className='mb-5'>
                            In a world full of financial noise, Rethink Wealth stands for clarity.We&apos;re here to question the default, break the usual patterns, and help you look at money—not as a number, but as a tool to design the life you truly want.
                        </p>
                        <p className='mb-5'>
                            Most people follow the crowd. <br />
                            We&apos;re here for those who ask better questions.
                        </p>
                        <p className='mb-5'>
                            Should I buy that policy just because my banker said so?
                        </p>
                        <p className='mb-5'>
                            Is this fund helping me build wealth or just keeping me busy?
                        </p>
                        <p className='mb-5'>
                            Am I investing to impress, or to become truly free?
                        </p>
                        <p className='mb-5'>
                            We offer a curated universe: stocks, mutual funds, PMS, AIFs, insurance, unlisted and pre-IPO opportunities but more importantly, we offer perspective. Because it&apos;s not about the product, it&apos;s about the purpose.
                        </p>
                        <p className='mb-5'>
                            At Rethink, we blend smart technology with deep human insight to guide investors who want to go beyond tips, trends, and fear-driven decisions.
                        </p>
                        <p className='mb-5'>
                            We&apos;re not in this for quick wins. We&apos;re here to build a generation of conscious wealth creators. Let&apos;s not just invest.

                        </p>
                        <p className='mb-5'>
                            Let&apos;s rethink what wealth means to us.
                        </p>
                        <p>
                            And then go build it—intentionally, confidently, and together.
                        </p>
                    </div>
                </div>
            </section>
            <section className='py-[40px] md:py-[75px] border border-b border-b-white'>
                <div className='px-4 max-w-screen-xl mx-auto'>
                    <h2 className='m-0 text-center text-white text-[28px] md:text-[50px] font-semibold'>
                        Meet the Founders
                    </h2>
                    <div className='w-full md:w-[85%] lg:w-[75%] mx-auto text-white flex flex-col md:flex-row items-center mt-0 md:mt-20'>
                        <div className='w-full md:w-[30%] text-center mt-8 md:mt-0'>
                            <Image
                                src={'/images/founder_img.webp'}
                                alt=''
                                width={185}
                                height={185}
                                className='mx-auto w-[120px] h-[120px] sm:w-[185px] sm:h-[185px]'
                            />
                            <p className='text-lg md:text-2xl font-medium mt-5'>
                                Vineet Patawari
                            </p>
                            <p className='mt-1'>
                                Founder, CEO
                            </p>
                        </div>
                        <div className='w-full md:w-[70%] md:ps-8 text-sm md:text-[16px] mt-6 md:mt-0'>
                            <p className='mb-5'>
                                Vineet  is a Chartered Accountant and an IIM Indore alumnus who has spent over a decade building platforms that make finance more accessible and actionable.
                            </p>
                            <p className='mb-5'>
                                He co-founded Elearnmarkets and StockEdge, two of India&apos;s most trusted names in financial education and stock market analytics.
                            </p>
                            <p className='mb-5'>
                                With Rethink Wealth, he wants to help people see wealth as a way to build lasting value and true financial freedom.
                            </p>
                            <div className='mt-6 md:mt-8 flex items-center'>
                                <span className='inline-block'>
                                    Connect with him:
                                </span>
                                <Link href={'https://www.instagram.com/vineet.patawari'} target='_blank' className='inline-block ms-4'>
                                    <Instagram />
                                </Link>
                                <Link href={'https://www.linkedin.com/in/vineet-patawari/'} target='_blank' className='inline-block ms-4'>
                                    <Linkedin />
                                </Link>
                                <Link href={'https://x.com/intent/user?screen_name=vineetpatawari'} target='_blank' className='inline-block ms-4'>
                                    <Twitter />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs
