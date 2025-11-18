
import { getOrdersByUserId } from '@/services/equity_orders';
import { OrderDetailsType } from '@/types/order.types';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';
import UserOrderSkeleton from '../skeletons/UserOrderSkeleton';

function MyOrders({ userId }: { userId: string | undefined }) {
    const [orders, setOrders] = useState<OrderDetailsType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await getOrdersByUserId({ userId: userId })
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [userId]);
    return (
        <div className='text-white'>
            <h2 className="text-[16px] md:text-lg font-semibold mb-4">
                All Orders ({orders.length})
            </h2>
            {loading ? (
                <UserOrderSkeleton />
            ) : (
                <div className="space-y-3">
                    {orders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {orders.map((order) => (
                                <OrderCard key={order.orderId} order={order} />
                            ))}
                        </div>
                    ) : (
                        <p>No orders found for this user.</p>
                    )}
                </div>
            )
            }
        </div>
    )
}

export default MyOrders
