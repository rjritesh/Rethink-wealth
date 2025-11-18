'use client'
import { UserProfile } from '@/types/auth.types'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function UserProfileIcon({ user, logout }: { user: UserProfile | null, logout: () => void }) {
  const [visible, setVisible] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    setVisible(false);
  }, [pathname])

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => setVisible(false), 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible])
  return (
    <div className='relative group' onClick={() => setVisible(!visible)}>
      <svg className='w-[24px] md:w-[30px]  cursor-pointer' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.3729 10.9111C20.3729 12.3577 19.8004 13.7451 18.7816 14.768C17.7627 15.791 16.3808 16.3656 14.9398 16.3656C13.4989 16.3656 12.117 15.791 11.0981 14.768C10.0792 13.7451 9.50684 12.3577 9.50684 10.9111C9.50684 9.46445 10.0792 8.07707 11.0981 7.05414C12.117 6.03122 13.4989 5.45654 14.9398 5.45654C16.3808 5.45654 17.7627 6.03122 18.7816 7.05414C19.8004 8.07707 20.3729 9.46445 20.3729 10.9111ZM17.6563 10.9111C17.6563 11.6344 17.3701 12.3281 16.8607 12.8396C16.3513 13.351 15.6603 13.6384 14.9398 13.6384C14.2194 13.6384 13.5284 13.351 13.019 12.8396C12.5095 12.3281 12.2233 11.6344 12.2233 10.9111C12.2233 10.1878 12.5095 9.49408 13.019 8.98262C13.5284 8.47115 14.2194 8.18382 14.9398 8.18382C15.6603 8.18382 16.3513 8.47115 16.8607 8.98262C17.3701 9.49408 17.6563 10.1878 17.6563 10.9111Z" fill="#101828" />
        <path fillRule="evenodd" clipRule="evenodd" d="M14.9408 0C6.68939 0 0 6.71591 0 15C0 23.2841 6.68939 30 14.9408 30C23.1922 30 29.8815 23.2841 29.8815 15C29.8815 6.71591 23.1922 0 14.9408 0ZM2.7165 15C2.7165 17.85 3.68494 20.4736 5.30805 22.5573C6.44822 21.0547 7.91882 19.837 9.60507 18.9992C11.2913 18.1613 13.1476 17.726 15.0291 17.7273C16.8863 17.7251 18.7195 18.1488 20.3889 18.966C22.0583 19.7832 23.5197 20.9723 24.6618 22.4427C25.8386 20.8931 26.631 19.0844 26.9734 17.1663C27.3157 15.2481 27.1982 13.2757 26.6306 11.4123C26.0629 9.54877 25.0614 7.84779 23.7089 6.45005C22.3565 5.05231 20.692 3.99799 18.8531 3.37433C17.0142 2.75067 15.0538 2.5756 13.1341 2.8636C11.2144 3.1516 9.39067 3.8944 7.81371 5.03053C6.23675 6.16666 4.95193 7.66346 4.06556 9.39708C3.17919 11.1307 2.71675 13.0513 2.7165 15ZM14.9408 27.2727C12.1345 27.2773 9.41288 26.308 7.23677 24.5291C8.11258 23.2699 9.27848 22.2419 10.6352 21.5324C11.9919 20.823 13.4993 20.4532 15.0291 20.4545C16.5397 20.4532 18.0288 20.8138 19.3727 21.5063C20.7167 22.1989 21.8766 23.2034 22.7562 24.4364C20.5632 26.2732 17.7967 27.2772 14.9408 27.2727Z" fill="#101828" />
      </svg>
      <div className="absolute top-[90%] md:min-w-[170px] right-[-40px] md:right-0 pt-3 md:pt-4">
        {
          visible &&
          <div className='bg-white border border-gray-300 rounded-xl px-4 py-3 overflow-hidden'>
            <Link href={'/my-profile'} className='text-gray-900 hover:text-gray-600 text-[16px] font-medium pb-2 mb-2 border-b border-b-gray-500 inline-block w-full whitespace-nowrap'>
              {user?.displayName}
            </Link>
            <button className='cursor-pointer text-gray-900 hover:text-gray-600 text-[16px] font-medium w-full text-left' onClick={logout}>
              Logout
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default UserProfileIcon
