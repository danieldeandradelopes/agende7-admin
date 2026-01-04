import PlanPrice from "./PlanPrice";

export interface PlanProps {
  id?: number;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface PlanResponse {
  id: number;
  name: string;
  description: string;
  is_active?: boolean;
  created_at: string;
  plan_price: PlanPrice[];
}

export default class Plan {
  readonly id?: number;
  readonly name: string;
  readonly description?: string;
  readonly is_active?: boolean;
  readonly created_at?: string;

  constructor({ id, name, description, is_active, created_at }: PlanProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.is_active = is_active ?? true;
    this.created_at = created_at;
  }
}
