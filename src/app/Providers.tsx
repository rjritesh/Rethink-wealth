'use client'
import { AuthProvider } from '@/context/AuthContext'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function Providers({ children }: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default Providers
