export interface OrderItemProps {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  is_deleted?: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface OrderItemWithProduct extends OrderItemProps {
  product?: {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    type: "physical" | "digital";
  };
}

export default class OrderItem {
  readonly id: number;
  readonly order_id: number;
  readonly product_id: number;
  readonly quantity: number;
  readonly unit_price: number;
  readonly is_deleted?: boolean;
  readonly updated_at?: string;
  readonly created_at?: string;

  constructor({
    id,
    order_id,
    product_id,
    quantity,
    unit_price,
    is_deleted,
    updated_at,
    created_at,
  }: OrderItemProps) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.unit_price = unit_price;
    this.is_deleted = is_deleted;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
