export type SubscriptionStatus = "active" | "past_due" | "canceled";

export interface SubscriptionValidateResponse {
  status: SubscriptionStatus;
  expires_at: string;
  trial_end_date: string;
  plan_name: string;
  plan_description: string;
  plan_price: string;
  features: any;
}

export interface SubscriptionProps {
  id?: number;
  barbershop_id: number;
  plan_price_id: number;
  status?: SubscriptionStatus;
  start_date: string;
  end_date?: string;
  trial_end_date?: string;
  created_at?: string;
}

export default class Subscription {
  readonly id?: number;
  readonly barbershop_id: number;
  readonly plan_price_id: number;
  readonly status?: SubscriptionStatus;
  readonly start_date: string;
  readonly end_date?: string;
  readonly trial_end_date?: string;
  readonly created_at?: string;

  constructor({
    id,
    barbershop_id,
    plan_price_id,
    status,
    start_date,
    end_date,
    trial_end_date,
    created_at,
  }: SubscriptionProps) {
    this.id = id;
    this.barbershop_id = barbershop_id;
    this.plan_price_id = plan_price_id;
    this.status = status ?? "past_due";
    this.start_date = start_date;
    this.end_date = end_date ?? "";
    this.trial_end_date = trial_end_date;
    this.created_at = created_at;
  }
}
