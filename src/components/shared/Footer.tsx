import Link from 'next/link'
import React from 'react'
import Disclaimer from './Disclaimer'
import { Instagram, Linkedin, Twitter, WhatsApp } from '../ui/SocialMediaIcon'
import Image from 'next/image'

function Footer() {
  return (
    <footer className='py-[40px] md:py-[75px] '>
      <div className='max-w-screen-xl mx-auto px-4 '>
        <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          <div>
          <Link href="/" className="focus:outline-none">
  <Image
    src="/images/rethink_wealth_logo_white.png"
    width={222}
    height={30}
    alt="Rethink Wealth Logo"
    className="w-[170px] md:w-[222px] h-auto select-none"
  />
</Link>

            <p className='font-normal text-[14px] md:text-[16px] my-3 md:my-5'>
             Think Beyond Ordinary
            </p>
            <div className='mt-6 md:mt-8'>
              <Link href={'https://www.instagram.com/rethinkwealth.in/'} target='_blank' className='inline-block'>
                <Instagram />
              </Link>
              <Link href={'https://www.linkedin.com/company/rethink-wealth/'} target='_blank' className='inline-block ms-4'>
                <Linkedin />
              </Link>
              <Link href={'https://www.x.com/rethinkwealthhq'} target='_blank' className='inline-block ms-4'>
                <Twitter />
              </Link>
             <Link
  href="https://wa.me/918910968305?text=Hi%20I%20wanted%20to%20know%20more%20about%20unlisted%20share.
"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block ms-4"
>
  <WhatsApp />
</Link>

            </div> 
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Legal</h3>
            <ul className="space-y-2 md:my-5 text-[#AFAFAF] font-normal text-[14px]">
              <li className='mb-2.5'><Link href="/privacy-policy" className="hover:underline hover:text-white">Privacy Policy</Link></li>
              <li className='mb-2.5'><Link href="/terms-of-use" className="hover:underline hover:text-white">Terms of use</Link></li>
              <li><Link href="/risk-declaration" className="hover:underline hover:text-white">Declaration of risk</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Company & Resources</h3>
            <ul className="space-y-2 md:my-5 text-[#AFAFAF] font-normal text-[14px]">
              <li className='mb-2.5'><Link href="/about-us" className="hover:underline hover:text-white">About us</Link></li>
              <li><Link href="/" className="hover:underline hover:text-white">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Our Office</h3>
          <ul className="space-y-0.5 md:my-3 text-[#AFAFAF] font-normal text-[14px]">
  <li>59, B.T. Road, Kolkata 700002</li>
  <li>
    <Link href="mailto:rethinkwealth.in@gmail.com" className="hover:underline hover:text-white">
      rethinkwealth.in@gmail.com
    </Link>
  </li>
  <li>
    <Link href="tel:+919830264971" className="hover:underline hover:text-white">
      +91 8910968305
    </Link>
  </li>
</ul>

          </div>
        </div>
        <p className='text-[#AFAFAF] font-normal text-[14px] my-8'>
          © 2025 Rethink Wealth, All rights reserved.
        </p>
      </div>
      <Disclaimer />
    </footer>
  )
}

export default Footer
