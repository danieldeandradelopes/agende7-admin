export interface PaymentProps {
  id?: number;
  subscription_id: number;
  amount: number;
  status: "pending" | "paid" | "failed" | "refunded";
  transaction_id?: string;
  paid_at?: string;
  created_at?: string;
}

export default class Payment {
  readonly id?: number;
  readonly subscription_id: number;
  readonly amount: number;
  readonly status: "pending" | "paid" | "failed" | "refunded";
  readonly transaction_id?: string;
  readonly paid_at?: string;
  readonly created_at?: string;

  constructor({
    id,
    subscription_id,
    amount,
    status,
    transaction_id,
    paid_at,
    created_at,
  }: PaymentProps) {
    this.id = id;
    this.subscription_id = subscription_id;
    this.amount = amount;
    this.status = status;
    this.transaction_id = transaction_id;
    this.paid_at = paid_at;
    this.created_at = created_at;
  }
}
