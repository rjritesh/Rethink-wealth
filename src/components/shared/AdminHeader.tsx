'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import UserProfileIcon from './UserProfileIcon';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    const navLinks = [
        {
            name: "Manage Shares", url: "/admin/manage-stocks"
        },
        {
            name: "Add New", url: "/admin/add-new"
        },
        {
            name: "Orders", url: "/admin/orders"
        },
        {
            name: "Reports", url: "/admin/stock-report"
        },
        {
            name: "Clients", url: "/admin/customer-report"
        }
    ];
    const { user, logout } = useAuth();
    return (
        <header className='sticky top-0 z-50 w-full bg-gray-50 backdrop-blur supports-[backdrop-filter]:bg-gray-50 transition-colors duration-300 shadow-[0_1px_1px_rgba(255,255,255,0.2)] sm:shadow-none'>
            <nav className="px-4 lg:px-4 py-2 md:py-4">
                <div className="flex flex-wrap justify-between items-center max-w-screen-xl mx-auto lg:px-4">
                    <Link href="/">
                        <Image
    src="/images/rethink_wealth_logo.png"
    width={222}
    height={30}
    alt="Rethink Wealth Logo"
    className="w-[170px] md:w-[222px] h-auto select-none"
  />
</Link>
                    <div className='flex '>
                        <div
                            className={`justify-between items-center w-full hidden lg:flex lg:w-auto`}
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:mt-0">
                                {navLinks?.map((item) => (
                                    <li key={item.name} className='me-10'>
                                        <Link
                                            href={item.url}
                                            className="block pr-4 pl-3 text-gray-900 hover:text-gray-800 lg:p-0"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center">
                            {
                                user ?
                                    <UserProfileIcon user={user} logout={logout} />
                                    :
                                    <Link
                                        href="/login"
                                        className="rethink-primary-btn"
                                    >
                                        Login
                                    </Link>
                            }
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <svg
                                    className={`block w-6 h-6`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:hidden`}>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:mt-0 border-t border-t-gray-300/70 py-2">
                            {navLinks?.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        className="block py-1.5 pr-2 pl-0 text-gray-900 hover:bg-gray-800 text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
