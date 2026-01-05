import AddonPrice from "./AddonPrice";

export interface AddonProps {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AddonResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  addon_price: AddonPrice[];
}

export default class Addon {
  readonly id?: number;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly is_active?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    name,
    slug,
    description,
    is_active,
    created_at,
    updated_at,
  }: AddonProps) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.is_active = is_active ?? true;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
