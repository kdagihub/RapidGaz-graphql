export type UserType = 'customer' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  userType: UserType;
  profileImage?: string;
}

export interface Vendor extends User {
  businessName: string;
  businessAddress: string;
  description: string;
  rating: number;
  deliveryFee: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  isOpen: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface GasProduct {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  size: string; // e.g., '6kg', '12.5kg'
  brand: string;
  imageUrl: string;
  inStock: number;
  description?: string;
}

export interface Order {
  id: string;
  customerId: string;
  vendorId: string;
  products: OrderProduct[];
  status: OrderStatus;
  deliveryAddress: string;
  deliveryCoordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  isPaid: boolean;
  deliveryInstructions?: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productSize: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type PaymentMethod = 'cash' | 'mobile_money' | 'card';