'use client'
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { fetUserProfile } from '@/services/user_actions';
import { getInitials } from '@/services/utils';
import { UserProfile } from '@/types/auth.types';
import React, { useEffect, useState } from 'react';

const BankDemat = dynamic(() => import('@/components/my-profile/BankDemat'));
const KYCDetail = dynamic(() => import('@/components/my-profile/KYCDetail'));
const MyOrders = dynamic(() => import('@/components/my-profile/MyOrders'));
const ProfileTab = dynamic(() => import('@/components/my-profile/ProfileTab'));

function MyProfile() {
    const { user } = useAuth();
    const displayName = getInitials(user?.displayName);
    const [activeTab, setActiveTab] = useState('Personal Details');
    const buttons = ['Personal Details', 'Demat & Bank Details', 'Verification Details', 'Orders'];
    const [userData, setUserData] = useState<Partial<UserProfile> | undefined>();

    useEffect(() => {
        const getUserData = async () => {
            if (!user) return;
            const userProfile = await fetUserProfile(user.uid);
            setUserData(userProfile);
        };
        getUserData();
    }, [user]);

    return (
        <section className='py-10 md:py-[100px] bg-[#121423]'>
            <div className='px-4 max-w-screen-xl mx-auto'>
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="w-full md:w-[30%] p-6 bg-slate-800/70 mb-4 md:mb-0 md:me-4 shadow-md rounded-lg flex flex-col items-center">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-slate-700 via-gray-600 to-slate-300 mb-6 p-1">
                            <div className="text-white text-2xl md:text-4xl font-semibold bg-gray-900/90 h-full w-full rounded-full text-center flex items-center justify-center">
                                {displayName}
                            </div>
                        </div>

                        <div className="hidden w-full md:flex flex-col space-y-2">
                            {buttons.map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveTab(item)}
                                    className={`px-4 py-3 text-left rounded transition-all cursor-pointer ${activeTab === item
                                        ? 'bg-white/10 text-white'
                                        : 'hover:bg-white/8 text-white'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex md:hidden overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex">
                                {buttons.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        className={`flex-shrink-0 px-3 py-1 rounded transition-all cursor-pointer text-sm ${activeTab === item
                                            ? 'bg-gray-900 text-white'
                                            : 'hover:bg-white/8 text-white'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-[70%] p-6 bg-slate-800/70 rounded-lg shadow-sm ${userData?.phone ? '':'animate-pulse'}`}>
                        {activeTab === 'Personal Details' && <ProfileTab userData={userData} setUserData={setUserData} user={user} />}
                        {activeTab === 'Demat & Bank Details' && <BankDemat userData={userData} setUserData={setUserData} userId={user?.uid} />}
                        {activeTab === 'Verification Details' && <KYCDetail userData={userData} setUserData={setUserData} userId={user?.uid} />}
                        {activeTab === 'Orders' && <MyOrders userId={user?.uid} />}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyProfile;
