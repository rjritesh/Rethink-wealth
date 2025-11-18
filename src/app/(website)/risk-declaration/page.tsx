import React from 'react'

function RiskDeclaration() {
    return (
        <section className='py-[40px] md:py-[75px] border-b border-[#E5E5E5]'>
            <div className='max-w-screen-xl mx-auto px-4 '>
                <div className='w-full lg:w-[70%] text-white text-sm md:text-[16px]'>
                    <h1 className='text-2xl md:text-5xl font-semibold md:font-bold'>
                        Declaration of risk
                    </h1>
                    <div className='mt-6 md:mt-12'>
                        <h2 className='font-semibold text-[16px] md:text-lg'>
                            By accessing and using Rethink Wealth&apos;s services, you acknowledge and agree to the following:
                        </h2>
                        <br />
                        <p>
                            A. All investments are subject to risk. The value of your investments may fluctuate, and past performance is not indicative of future results. You may incur losses, including the possible loss of principal invested.
                            <br /><br />
                            B. Unlisted / Pre-IPO securities carry significant additional risks, including low liquidity, lack of standardized pricing, business uncertainties, and regulatory lock-in requirements. These securities may be difficult or impossible to sell quickly at a desirable price, or at all.
                            <br /><br />
                            C. Mutual fund investments are subject to market risk, including but not limited to equity risk, interest rate risk, credit risk, and liquidity risk. Scheme-related documents should be read carefully before investing.
                            <br /><br />
                            D. No assurance or guarantee is provided by Rethink Wealth or its partners regarding returns, liquidity, or performance of any investment opportunity.
                            <br /><br />
                            E. All investment decisions are made solely at your discretion. Rethink Wealth does not provide personalized financial, tax, or legal advice. Any information or content made available through the Platform is for general informational purposes only.
                            <br /><br />
                            F. You are solely responsible for evaluating the merits and risks associated with using our services and making investments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RiskDeclaration
