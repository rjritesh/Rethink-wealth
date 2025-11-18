import React from 'react'

function Model({ setShowModel, userName }: { setShowModel: (show: boolean) => void, userName: string | null | undefined }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-[6px]">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <button onClick={() => setShowModel(false)} className="absolute top-3 end-2.5 text-gray-300 bg-transparent hover:bg-gray-200 rounded-full text-sm w-6 h-6 ms-auto inline-flex justify-center items-center hover:text-gray-500">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                    <div className="p-5 md:p-6 lg:p-8 text-center">
                        <div className='text-center mt-2 mb-3 md:mt-2 md:mb-6'>
                            <svg className='inline-block w-[42px] h-[42px] md:w-[60px] md:h-[60px]' width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 0C13.5 0 0 13.5 0 30C0 46.5 13.5 60 30 60C46.5 60 60 46.5 60 30C60 13.5 46.5 0 30 0ZM24 45L9 30L13.23 25.77L24 36.51L46.77 13.74L51 18L24 45Z" fill="#32AD22" />
                            </svg>
                        </div>
                        <p className='text-lg md:text-xl font-semibold text-center'>
                            Dear {userName}, Thanks for placing the order with us!
                        </p>
                        <p className='text-sm md:text-[15px] my-3.5'>
                            Our team will contact you shortly to complete the  process and finalize your purchase.
                        </p>
                        <p className='text-[12px] font-medium mt-4.5'>
                            For further assistance, <br />
                            you can contact - 91 8765476543
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model
