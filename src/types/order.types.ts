export interface CreateOrderParams {
  userId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  stockId: string;
  stockName: string;
  stockQuantity: number;
  stockPrice: number;
  orderType: 'BUY' | 'SELL';
}

export interface OrderDetailsType {
  orderId: string;
  stockId: string;
  stockName: string;
  stockPrice: number;
  stockQuantity: number;
  totalAmount: string;
  userEmail: string;
  userId: string;
  userMobile: string;
  userName: string;
  orderType: string;
  status: string;
  createdAt: string;
}