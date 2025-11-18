'use server'

import { CreateOrderParams } from "@/types/order.types";
import { db } from "@/services/firebase";
import { addDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { formatINR } from "../utils/priceFormet";

export const initiateEquityOrder = async (orderData: CreateOrderParams) => {
    if (!orderData.userId || !orderData.stockId ||
        orderData.stockQuantity <= 0 || orderData?.stockPrice <= 0) {
        return { status: false, message: "Please try again" };
    }
    try {
        const totalAmount = formatINR(orderData.stockQuantity * orderData.stockPrice);
        const timestamp = new Date().toISOString();

        // Create order document
        const order = {
            userId: orderData.userId,
            userName: orderData.userName,
            userEmail: orderData.userEmail,
            userMobile: orderData.userMobile,
            stockId: orderData.stockId,
            stockName: orderData.stockName,
            stockQuantity: orderData.stockQuantity,
            stockPrice: orderData.stockPrice,
            totalAmount: totalAmount,
            orderType: orderData.orderType,
            status: 'PENDING',
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const orderRef = await addDoc(collection(db, 'orders'), order);
        return { status: true, message: orderRef.id };
    } catch (error) {
        console.error('Order creation failed:', error);
        return { status: false, message: "Please try again" };
    }
}

export const getAllOrders = async () => {
    try {
        const q = query(collection(db, 'orders'),
            orderBy("createdAt", "desc")
        )
        const orderSnapshot = await getDocs(q);
        const orders = orderSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                orderId: doc.id,
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                userMobile: data.userMobile,
                stockId: data.stockId,
                stockName: data.stockName,
                stockQuantity: data.stockQuantity,
                stockPrice: data.stockPrice,
                totalAmount: data.totalAmount,
                orderType: data.orderType,
                status: data.status,
                createdAt: data.createdAt,
            }
        })
        return orders;
    } catch {
        console.log("Error while fetching orders!");
    }
}
export const updateOrderStatus = async (orderId: string, newstate: string) => {
    console.log(orderId, newstate);
}

export const getOrdersByStockId = async (stockId: string) => {
    if (!stockId) {
        return [];
    }
    try {
        const q = query(
            collection(db, "orders"),
            where("stockId", "==", stockId),
            orderBy("createdAt", "desc")
        );

        const orderSnapshot = await getDocs(q);

        const orders = orderSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                orderId: doc.id,
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                userMobile: data.userMobile,
                stockId: data.stockId,
                stockName: data.stockName,
                stockQuantity: data.stockQuantity,
                stockPrice: data.stockPrice,
                totalAmount: data.totalAmount,
                orderType: data.orderType,
                status: data.status,
                createdAt: data.createdAt,
            };
        });

        return orders;
    } catch (error) {
        console.error("Error while fetching orders by stockId:", error);
        return [];
    }
};

export const getOrdersByUserId = async ({
    userId,
    userMobile,
    userEmail,
}: {
    userId?: string;
    userMobile?: string;
    userEmail?: string;
}) => {
    try {
        let q;

        if (userId) {
            q = query(
                collection(db, "orders"),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            );
        } else if (userMobile) {
            q = query(
                collection(db, "orders"),
                where("userMobile", "==", userMobile),
                orderBy("createdAt", "desc")
            );
        } else if (userEmail) {
            q = query(
                collection(db, "orders"),
                where("userEmail", "==", userEmail),
                orderBy("createdAt", "desc")
            );
        } else {
            return [];
        }
        const orderSnapshot = await getDocs(q);

        const orders = orderSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                orderId: doc.id,
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                userMobile: data.userMobile,
                stockId: data.stockId,
                stockName: data.stockName,
                stockQuantity: data.stockQuantity,
                stockPrice: data.stockPrice,
                totalAmount: data.totalAmount,
                orderType: data.orderType,
                status: data.status,
                createdAt: data.createdAt,
            };
        });
        return orders;
    } catch (error) {
        console.error("Error while fetching orders:", error);
        return [];
    }
};