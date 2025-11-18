import { getOrdersByUserId } from '@/services/equity_orders';
import { OrderDetailsType } from '@/types/order.types';
import dynamic from 'next/dynamic';
import React from 'react'

const OrderDetails = dynamic(() => import("@/components/admin/OrderDetails"));

async function UserOrdersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const search = decodeURIComponent(id);

    let query: { userId?: string; userEmail?: string; userMobile?: string } = {};

    if (search.startsWith('email_')) {
        query = { userEmail: search.replace('email_', '') };
    } else if (search.startsWith('userphone_')) {
        query = { userMobile: search.replace('userphone_', '') };
    } else {
        query = { userId: search };
    }
    const orders: OrderDetailsType[] = await getOrdersByUserId(query);

    return (
        <div className="flex-auto w-full md:w-3/4 p-4 bg-white h-auto md:h-full">
            <h2 className="text-lg font-semibold mb-4">
                All Orders ({orders.length})
            </h2>
            <div className="space-y-3">
                {orders.length > 0 ?
                    orders.map((order) => (
                        <OrderDetails key={order.orderId} order={order} />
                    ))
                    :
                    <p>No orders found for this user.</p>
                }
            </div>
        </div>
    )
}

export default UserOrdersPage
