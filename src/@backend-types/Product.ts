export interface ProductProps {
  id: number;
  barber_shop_id: number;
  title: string;
  description: string;
  image_url?: string;
  price: number;
  stock: number;
  type: "physical" | "digital";
  category?: string;
  is_active: boolean;
  is_deleted?: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface CreateProductRequest {
  barber_shop_id: number;
  title: string;
  description: string;
  image_url?: string;
  price: number;
  stock: number;
  type: "physical" | "digital";
  category?: string;
}

export interface UpdateProductRequest {
  id: number;
  barber_shop_id: number;
  title?: string;
  description?: string;
  image_url?: string;
  price?: number;
  stock?: number;
  type?: "physical" | "digital";
  category?: string;
  is_active?: boolean;
}

export default class Product {
  readonly id: number;
  readonly barber_shop_id: number;
  readonly title: string;
  readonly description: string;
  readonly image_url?: string;
  readonly price: number;
  readonly stock: number;
  readonly type: "physical" | "digital";
  readonly category?: string;
  readonly is_active: boolean;
  readonly is_deleted?: boolean;
  readonly updated_at?: string;
  readonly created_at?: string;

  constructor({
    id,
    barber_shop_id,
    title,
    description,
    image_url,
    price,
    stock,
    type,
    category,
    is_active,
    is_deleted,
    updated_at,
    created_at,
  }: ProductProps) {
    this.id = id;
    this.barber_shop_id = barber_shop_id;
    this.title = title;
    this.description = description;
    this.image_url = image_url;
    this.price = price;
    this.stock = stock;
    this.type = type;
    this.category = category;
    this.is_active = is_active;
    this.is_deleted = is_deleted;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
