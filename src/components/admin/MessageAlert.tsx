'use client';

import { MessageAlertProps } from '@/types/stockForm.types';
import React, { useEffect } from 'react';

const MessageAlert: React.FC<MessageAlertProps> = ({ message, setMessage }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 1500);

        return () => clearTimeout(timer);
    }, [message, setMessage]);
    if (!message) return null;
    return (
        <div
            className={`p-4 mb-6 rounded-md text-sm font-medium ${message.type === 'success'
                ? 'bg-green-100 border border-green-300 text-green-800'
                : 'bg-red-100 border border-red-300 text-red-800'
                }`}
            role="alert"
        >
            {message.text}
        </div>
    );
};

export default React.memo(MessageAlert);