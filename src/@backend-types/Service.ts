export interface ServiceProps {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: number;
  barber_shop_id: number;
  updated_at?: string;
  created_at?: string;
  is_deleted?: boolean;
}

export default class Service {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly barber_shop_id: number;
  readonly duration: number;
  readonly updated_at?: string;
  readonly created_at?: string;
  readonly is_deleted?: boolean;
  constructor({
    id,
    title,
    description,
    price,
    duration,
    updated_at,
    barber_shop_id,
    created_at,
    is_deleted,
  }: ServiceProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.updated_at = updated_at;
    this.created_at = created_at;
    this.barber_shop_id = barber_shop_id;
    this.is_deleted = is_deleted;
  }
}
