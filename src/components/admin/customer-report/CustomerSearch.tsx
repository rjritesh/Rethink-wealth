'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function CustomerSearch() {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            router.push('/admin/customer-report'); // Show all users if input is empty
            return;
        }

        try {
            let idToUse = '';

            if (validateEmail(searchInput)) {
                idToUse = `email_${searchInput}`;
            } else if (validateMobile(searchInput)) {
                idToUse = `userphone_${searchInput}`;
            } else {
                idToUse = searchInput; // Treat as userId
            }
            router.push(`/admin/customer-report/${encodeURIComponent(idToUse)}`);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const validateEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validateMobile = (value: string) => /^\d{10}$/.test(value);

    return (
        <div className="w-full md:w-1/4 h-auto md:h-full px-3 py-4 overflow-y-auto bg-white border-b md:border-b-0 md:border-r border-gray-200">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
                Search with - Email | Id | Mobile
            </label>
            <input
                type="text"
                id="search"
                name="search"
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent placeholder:text-gray-350 placeholder:text-sm"
                placeholder="Rethink Wealth"
            />
            <div className="text-center mt-6">
                <button
                    onClick={handleSearch}
                    className="rethink-blue-btn cursor-pointer"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default CustomerSearch
