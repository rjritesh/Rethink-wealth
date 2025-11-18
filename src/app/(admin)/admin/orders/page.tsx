'use client'
import { getAllOrders } from '@/services/equity_orders'
import { OrderDetailsType } from '@/types/order.types';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'

const OrderDetails = dynamic(()=>import("@/components/admin/OrderDetails"));

function Orders() {
  const [orders, setOrders] = useState<OrderDetailsType[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders ?? []);
    };
    fetchOrders();
  }, []);

  return (
    <section className='py-[40px] md:py-[75px]'>
      <div className='px-4 max-w-screen-xl mx-auto'>
        {
          orders?.map((order) => (
            <OrderDetails key={order.orderId} order={order} />
          ))
        }
      </div>
    </section>
  );
}

export default Orders
