interface PaidCommissionProps {
  id?: number;
  barber_shop_id: number;
  barber_id: number;
  order_id?: number;
  schedule_id?: number;
  type: "physical" | "services" | "digital";
  commission_value: number;
  commission_percentage?: number;
  base_value?: number;
  status: "pending" | "paid" | "canceled";
  payment_date?: Date | string;
  notes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export default class PaidCommission {
  readonly id?: number;
  readonly barber_shop_id: number;
  readonly barber_id: number;
  readonly order_id?: number;
  readonly schedule_id?: number;
  readonly type: "physical" | "services" | "digital";
  readonly commission_value: number;
  readonly commission_percentage?: number;
  readonly base_value?: number;
  readonly status: "pending" | "paid" | "canceled";
  readonly payment_date?: Date | string;
  readonly notes?: string;
  readonly created_at?: Date | string;
  readonly updated_at?: Date | string;

  constructor(props: PaidCommissionProps) {
    this.id = props.id;
    this.barber_shop_id = props.barber_shop_id;
    this.barber_id = props.barber_id;
    this.order_id = props.order_id;
    this.schedule_id = props.schedule_id;
    this.type = props.type;
    this.commission_value = props.commission_value;
    this.commission_percentage = props.commission_percentage;
    this.base_value = props.base_value;
    this.status = props.status;
    this.payment_date = props.payment_date;
    this.notes = props.notes;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }
}

export interface CreatePaidCommissionRequest {
  barber_shop_id: number;
  barber_id: number;
  order_id?: number;
  schedule_id?: number;
  type: "physical" | "services" | "digital";
  commission_value: number;
  commission_percentage?: number;
  base_value?: number;
  status?: "pending" | "paid" | "canceled";
  payment_date?: Date | string;
  notes?: string;
}

export interface MarkCommissionAsPaidRequest {
  id: number;
  barber_shop_id: number;
  payment_date?: Date | string;
  notes?: string;
}

export interface PaidCommissionItem {
  barber_id: number;
  order_id?: number;
  schedule_id?: number;
  type: "physical" | "services" | "digital";
  commission_value: number;
  commission_percentage?: number;
  base_value?: number;
}

export type CreatePaidCommissionMutationRequest =
  | (PaidCommissionItem & {
      payment_date?: Date | string;
      notes?: string;
    })
  | {
      items: PaidCommissionItem[];
      payment_date?: Date | string;
      notes?: string;
    };
