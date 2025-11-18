'use client'
import { initiateEquityOrder } from '@/services/equity_orders';
import { formatINR } from '@/utils/priceFormet';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState, useCallback } from 'react';
import Toast from '../shared/Toast';
import { Stock } from '@/types/stock.types';
import { useAuth } from '@/context/AuthContext';
import Model from '../shared/Model';
import { CreateOrderParams } from '@/types/order.types';

const BuyEquityCard = ({ stockData, stockId }: { stockData: Partial<Stock>, stockId: string }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [quantity, setQuantity] = useState(stockData.minQuantity || 1);

    const minQuantity = stockData.minQuantity ?? 1;
    const currentPrice = stockData.currentPrice ?? 0;
    const quantityWarning = quantity < minQuantity;

    // Memoized calculations
    const calculateTotalPrice = useMemo(() => (
        formatINR(quantity * currentPrice)
    ), [quantity, currentPrice]);

    // Event handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        setQuantity(val);
    };

    const validateQuantity = useCallback(() => {
        if (quantity < minQuantity || isNaN(quantity)) {
            return true;
        }
        return false;
    }, [quantity, minQuantity]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    };

    const showCustomToast = useCallback((message: string, type = false) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    }, []);

    const placeOrder = async () => {
        if (validateQuantity()) return;

        try {
            setIsLoading(true);

            if (!user) {
                router.push(`/login?from=${encodeURIComponent(window.location.pathname)}`);
                return;
            }

            if (!stockData?.name || !user.uid || !user.displayName || !user.email || !user.phone) {
                showCustomToast('Some order details are missing');
                return;
            }

            const orderData: CreateOrderParams = {
                stockName: stockData.name,
                userName: user.displayName,
                userEmail: user.email,
                userMobile: user.phone,
                stockId,
                userId: user.uid,
                stockQuantity: quantity,
                stockPrice: currentPrice,
                orderType: 'BUY',
            }
console.log("order details: ", orderData);
            const result = await initiateEquityOrder(orderData);
            setToastType(result?.status);
            setShowModel(result?.status);

            setTimeout(() => {
                setShowModel(false);
                router.push('/shares');
            }, 5000);
        } catch {
            showCustomToast('Failed to place order');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='border border-[#555151]/38 rounded-xl'>
                <div className='px-6 py-3 text-[16px] md:text-[30px] font-medium text-[#14438B]'>
                    BUY
                </div>

                <div className='px-6 py-5 md:py-4 border-b border-t border-[#555151]/30'>
                    <div className='flex items-center justify-between mb-3'>
                        <p className='text-sm md:text-[16px] font-medium'>
                            Price per share
                        </p>
                        <p className='text-sm md:text-lg font-medium min-w-[110px] text-center'>
                            {formatINR(currentPrice)}
                        </p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-sm md:text-[16px] font-medium'>
                            Order Quantity
                        </p>
                        <input
                            type="number"
                            min={minQuantity}
                            // value={quantity}
                            onChange={handleChange}
                            onBlur={validateQuantity}
                            onKeyDown={handleKeyDown}
                            placeholder={minQuantity.toString()}
                            className='border border-[#B9B4B4] max-w-[110px] rounded-sm focus:ring-0 focus:outline-none focus:shadow-md text-sm py-1 px-4 text-center text-[#827777]'
                        />
                    </div>

                    <p className={`text-[10px] ${quantityWarning ? 'text-red-500' : 'text-[#535353]'} font-medium text-right mt-1`}>
                        Min. Quantity - {minQuantity}
                    </p>
                </div>

                <div className='px-6 py-4 md:py-4'>
                    <div className='flex items-center justify-between mb-6 md:mb-8'>
                        <p className='text-sm md:text-[16px] font-medium'>
                            Total Investment
                        </p>
                        <p className='text-sm md:text-lg font-medium min-w-[110px] text-center'>
                            {calculateTotalPrice}
                        </p>
                    </div>

                    <div className='text-center'>
                        <button
                            onClick={placeOrder}
                            disabled={quantityWarning || isLoading}
                            className={`rethink-blue-btn ${quantityWarning ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                        >
                            {isLoading ? "Placing Order..." : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>

            {showToast && <Toast message={toastMessage} type={toastType} />}
            {showModel && user && <Model setShowModel={setShowModel} userName={user.displayName} />}
        </>
    );
};

export default React.memo(BuyEquityCard);