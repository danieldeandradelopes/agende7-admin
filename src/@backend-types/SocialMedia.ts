export interface SocialMediaProps {
  id: number;
  name: string;
  url: string;
  icon: string;
  barber_shop_id: number;
  updated_at?: string;
  created_at?: string;
}

export default class SocialMedia {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly icon: string;
  readonly barber_shop_id: number;
  readonly updated_at?: string;
  readonly created_at?: string;

  constructor({
    id,
    name,
    url,
    icon,
    barber_shop_id,
    updated_at,
    created_at,
  }: SocialMediaProps) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.barber_shop_id = barber_shop_id;
    this.updated_at = updated_at;
    this.created_at = created_at;
  }
}
