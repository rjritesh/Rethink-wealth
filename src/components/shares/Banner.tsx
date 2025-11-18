import React from 'react'

function Banner() {
  return (
    <section className='py-[40px] md:py-[85px]'>
      <div className='px-4 max-w-screen-xl mx-auto'>
        <h1 className='m-0 text-center text-white text-[28px] md:text-[50px] font-semibold'>
          Your Trusted <br /> Partner in Wealth
        </h1>
        <div className='text-center mt-[30px] md:mt-[60px]'>
          <a className='inline-block animate-up-down'>
            <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 25C16.2768 24.9964 15.5635 24.835 14.9118 24.5275C14.2602 24.22 13.6865 23.7742 13.2324 23.2222L1.30639 9.05556C0.609507 8.20269 0.170969 7.17501 0.0407494 6.08963C-0.0894705 5.00426 0.0938647 3.90484 0.569864 2.91667C0.955915 2.05785 1.58591 1.32615 2.3846 0.808952C3.18329 0.291755 4.11692 0.0109252 5.07399 0H28.926C29.8831 0.0109252 30.8167 0.291755 31.6154 0.808952C32.4141 1.32615 33.0441 2.05785 33.4301 2.91667C33.9061 3.90484 34.0895 5.00426 33.9593 6.08963C33.829 7.17501 33.3905 8.20269 32.6936 9.05556L20.7676 23.2222C20.3135 23.7742 19.7398 24.22 19.0882 24.5275C18.4365 24.835 17.7232 24.9964 17 25Z" fill="#E6E6E6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
