export type SubscriptionAddonStatus = "active" | "past_due" | "canceled";

export interface SubscriptionAddonProps {
  id?: number;
  subscription_id: number;
  addon_id: number;
  addon_price_id: number;
  status?: SubscriptionAddonStatus;
  start_date: string;
  end_date?: string;
  created_at?: string;
}

export default class SubscriptionAddon {
  readonly id?: number;
  readonly subscription_id: number;
  readonly addon_id: number;
  readonly addon_price_id: number;
  readonly status?: SubscriptionAddonStatus;
  readonly start_date: string;
  readonly end_date?: string;
  readonly created_at?: string;

  constructor({
    id,
    subscription_id,
    addon_id,
    addon_price_id,
    status,
    start_date,
    end_date,
    created_at,
  }: SubscriptionAddonProps) {
    this.id = id;
    this.subscription_id = subscription_id;
    this.addon_id = addon_id;
    this.addon_price_id = addon_price_id;
    this.status = status ?? "active";
    this.start_date = start_date;
    this.end_date = end_date ?? "";
    this.created_at = created_at;
  }
}
