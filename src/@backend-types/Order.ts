import OrderItem from "./OrderItem";

export interface OrderProps {
  id: number;
  barber_shop_id: number;
  client_id: number;
  total: number;
  status: "pending" | "confirmed" | "canceled";
  notes?: string;
  is_deleted?: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface CreateOrderRequest {
  barber_shop_id: number;
  client_id?: number;
  barber_id?: number;
  total: number;
  status?: "pending" | "confirmed" | "canceled";
  notes?: string;
  items: CreateOrderItemRequest[];
}

export interface CreateOrderByBarberShopRequest {
  client_id?: number;
  total: number;
  status?: "pending" | "confirmed" | "canceled";
  notes?: string;
  items: CreateOrderItemRequest[];
}
export interface CreateOrderItemRequest {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface UpdateOrderStatusRequest {
  id: number;
  barber_shop_id: number;
  status: "pending" | "confirmed" | "canceled";
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface OrderItemProductDetail extends OrderItem {
  product_title: string;
  product_description: string;
  product_price: number;
  product_stock: number;
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface BarberData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface OrderWithItemsAndProductInfo extends Order {
  products: OrderItemProductDetail[];
  customer: CustomerData;
  barber?: BarberData;
}

export interface ProductInOrder {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  unit_price: number;
}

export interface OrderWithProducts extends Order {
  products: ProductInOrder[];
}

export default class Order {
  readonly id: number;
  readonly barber_shop_id: number;
  readonly client_id: number;
  readonly total: number;
  readonly status: "pending" | "confirmed" | "canceled";
  readonly notes?: string;
  readonly is_deleted?: boolean;
  readonly updated_at?: string;
  readonly created_at?: string;
  constructor({
    id,
    barber_shop_id,
    client_id,
    total,
    status,
    notes,
    is_deleted,
    updated_at,
    created_at,
  }: OrderProps) {
    this.id = id;
    this.barber_shop_id = barber_shop_id;
    this.client_id = client_id;
    this.total = total;
    this.status = status;
    this.notes = notes;
    this.is_deleted = is_deleted;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
