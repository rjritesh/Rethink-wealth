// import { updateOrderStatus } from "@/services/equityOrder";
import { Badge } from "../ui/Badge";
import React from "react";
import { OrderDetailsType } from "@/types/order.types";
import Link from "next/link";

function OrderDetails({ order }: { order: OrderDetailsType }) {
    // const handleStatusUpdate = async (newStatus: string) => {
    //     await updateOrderStatus(order.orderId, newStatus);
    // };
    return (
        <div className="w-full lg:w-[85%] mx-auto mb-5 md:mb-6 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    {/* Stock Information */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-lg font-semibold text-gray-900"><span className="text-gray-500">Stock:</span> <Link href={`/admin/stock-report/${order.stockId}`}>{order.stockName}</Link></h2>
                            <Badge variant={order.orderType === 'BUY' ? 'success' : 'destructive'}>
                                {order.orderType}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-500">Quantity:</span>
                                <span className="font-medium ml-1">{order.stockQuantity}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Price:</span>
                                <span className="font-medium ml-1">₹{order.stockPrice}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Total:</span>
                                <span className="font-medium ml-1">{order.totalAmount}</span>
                            </div>
                            <div>
                                <span className="text-gray-500">Status:</span>
                                <Badge className="ml-1" variant={
                                    order.status === 'COMPLETED' ? 'success' :
                                        order.status === 'PENDING' ? 'warning' :
                                            order.status === 'REJECTED' ? 'destructive' : 'outline'
                                }>
                                    {order.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                        <h4 className="font-medium text-gray-900 mb-2">User Details</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">Name:</span>
                                <span className="font-medium"><Link href={`/admin/customer-report/${encodeURIComponent(order.userId)}`}>{order.userName}</Link></span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">Email:</span>
                                <a href={`mailto:${order.userEmail}`} className="text-blue-600 hover:underline">
                                    {order.userEmail}
                                </a>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 w-20">Phone:</span>
                                <a href={`tel:${order.userMobile}`} className="text-blue-600 hover:underline">
                                    {order.userMobile}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Order Meta */}
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 mb-2">
                            {new Date(order.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(OrderDetails);