export interface AddonPriceProps {
  id?: number;
  addon_id: number;
  billing_cycle: "monthly" | "semiannual" | "yearly";
  price: number;
  created_at?: string;
}

export default class AddonPrice {
  readonly id?: number;
  readonly addon_id: number;
  readonly billing_cycle: "monthly" | "semiannual" | "yearly";
  readonly price: number;
  readonly created_at?: string;

  constructor({
    id,
    addon_id,
    billing_cycle,
    price,
    created_at,
  }: AddonPriceProps) {
    this.id = id;
    this.addon_id = addon_id;
    this.billing_cycle = billing_cycle;
    this.price = price;
    this.created_at = created_at;
  }
}
