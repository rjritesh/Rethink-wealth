import { OrderDetailsType } from '@/types/order.types'
import React from 'react'
import { Badge } from '../ui/Badge'

function OrderCard({ order }: { order: OrderDetailsType }) {
    return (
        <div className="text-white">
            <div className="text-[12px] md:text-sm bg-gray-900 p-4 rounded-xl shadow-sm overflow-hidden border border-gray-500">
                <div className='relative'>
                    <div className='absolute top-0 right-0'>
                        <Badge variant={order.orderType === 'BUY' ? 'success' : 'destructive'}>
                                                        {order.orderType}
                                                    </Badge>
                    </div>
                    <p className='mb-2'>Stock: <span>{order.stockName}</span></p>
                    <p className='mb-2'>Quantity: <span>{order.stockQuantity}</span></p>
                    <p className='mb-2'>Price: <span>₹{order.stockPrice}</span></p>
                    <p className='mb-2'>Total: <span>{order.totalAmount}</span></p>
                    <p className='mb-2'>Status {" "}
                        <Badge
                            className="mt-1"
                            variant={
                                order.status === 'COMPLETED'
                                    ? 'success'
                                    : order.status === 'PENDING'
                                        ? 'warning'
                                        : order.status === 'REJECTED'
                                            ? 'destructive'
                                            : 'outline'
                            }
                        >
                            {order.status}
                        </Badge>
                    </p>
                    <p>Date: <span>{new Date(order.createdAt).toISOString().split('T')[0]}</span></p>
                </div>
            </div>
        </div>

    )
}

export default OrderCard
