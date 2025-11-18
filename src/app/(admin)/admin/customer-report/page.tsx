'use client';
import { fetchAllUsers } from '@/services/user_actions';
import { UserProfile } from '@/types/auth.types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Page() {
    const [allUsers, setAllUsers] = useState<Partial<UserProfile>[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setAllUsers(data ?? []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (

        <div className="flex-auto w-full md:w-3/4 p-4 bg-white h-auto md:h-full">

            {allUsers.length > 0 &&
                <>
                    <h2 className="text-lg font-semibold mb-4">
                        All Users ({allUsers.length})
                    </h2>
                    <div className="space-y-3">
                        {allUsers.map((user) => (
                            <div
                                key={user.uid}
                                className="border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition"
                            >
                                <div className="space-y-1">
                                    <p className="text-gray-800 font-semibold text-sm md:text-lg">
                                        {user.displayName || 'Unnamed User'}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">Email:</span> {user.email}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium">Mobile:</span> {user.phone || 'N/A'}
                                    </p>
                                </div>
                                {user.uid && (
                                    <div>
                                        <Link href={`/admin/customer-report/${encodeURIComponent(user.uid)}`}>
                                            <button className="rethink-blue-btn cursor-pointer">
                                            View Details
                                        </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}

export default Page;
