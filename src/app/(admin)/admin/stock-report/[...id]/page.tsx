'use client'
import { getOrdersByStockId } from '@/services/equity_orders';
import { OrderDetailsType } from '@/types/order.types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const OrderDetails = dynamic(() => import("@/components/admin/OrderDetails"));

function Page() {
    const params = useParams();
    const stockId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
    const [orders, setOrders] = useState<OrderDetailsType[]>([]);
    useEffect(() => {
        if (stockId) {
            getOrdersByStockId(stockId).then((data) => {
                setOrders(data);
            });
        }
        else {

        }
    }, [stockId]);
    return (
        <div>
            <div className='pt-2 pb-4 mb-7 border-b border-b-gray-200'>
                <Link href={'/admin/stock-report'} className='font-semibold text-sm text-blue-400'>Stock Orders</Link> / <span className='text-gray-900 text-sm'>{orders[0] && orders[0].stockName}</span>
            </div>
            {
                orders?.map((order) => (
                    <OrderDetails key={order.orderId} order={order} />
                ))
            }
        </div>
    )
}

export default Page
