'use client'
import React, { useState } from 'react'

function Disclaimer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='border-t border-gray-800 pt-7'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <button className="text-white text-lg md:text-xl font-medium w-full flex justify-between items-center outline-0 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>Disclaimer
                    <span className={`transition-all duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
                        <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.374196 0.382399C0.613866 0.137549 0.938885 0 1.27778 0C1.61667 0 1.94169 0.137549 2.18136 0.382399L8.50772 6.84743L14.8341 0.382399C15.0751 0.144488 15.398 0.0128435 15.7331 0.0158193C16.0682 0.018795 16.3887 0.156153 16.6257 0.398309C16.8626 0.640464 16.997 0.968042 17 1.31049C17.0029 1.65294 16.874 1.98285 16.6412 2.22918L9.4113 9.6176C9.17163 9.86245 8.84661 10 8.50772 10C8.16882 10 7.8438 9.86245 7.60413 9.6176L0.374196 2.22918C0.134599 1.98425 0 1.65211 0 1.30579C0 0.959466 0.134599 0.627323 0.374196 0.382399Z" fill="#E6E6E6" />
                        </svg>
                    </span>
                </button>
                {
                    !isOpen && < div className='text-[#AFAFAF] font-normal text-[14px] mt-4'>
                        <p>
                            The information and data provided on the Rethink Wealth platform regarding unlisted equities, including Pre-IPO shares, are intended solely for informational purposes and should not be construed as an offer, solicitation, or recommendation to invest. Rethink Wealth and its representatives are not SEBI-registered investment advisors or research analysts. Any content, research, analysis, or information shared on this platform does not constitute investment advice and should not be relied upon as such.
                            <br /><br />
                            Investors are strongly encouraged to conduct their own independent research and due diligence before making any investment decisions. The decision to invest or not to invest must be made at the investor&apos;s own discretion and responsibility.
                            <br /><br />
                            Unlisted equities are inherently riskier than listed securities, and may involve liquidity risk, regulatory changes, lack of public information, and significant market volatility. Prospective investors should carefully evaluate these risks and consult with their own financial or investment advisors to determine suitability, based on their personal financial goals, risk appetite, and investment horizon.
                            <br /><br />
                            The information shared on the Rethink Wealth platform is derived from publicly available sources and, to the best of our knowledge, does not contain or rely on any insider information.
                            <br /><br />
                            Please note that Pre-IPO shares are classified as unlisted securities. The mention of a potential IPO should not be interpreted as any assurance or guarantee by Rethink Wealth regarding the listing or timing of such an event. The decision to go public rests solely with the issuing company and may or may not materialize.
                            <br /><br />
                            As per SEBI regulations, unlisted shares are subject to a lock-in period of six months from the date of listing on stock exchanges.
                            Unless specifically stated otherwise, Rethink Wealth will be acting as the counterparty (seller) in transactions executed through this platform.
                        </p>
                    </ div>
                }
            </div>
        </div>
    )
}

export default Disclaimer
