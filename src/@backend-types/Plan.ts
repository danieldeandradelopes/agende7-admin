import PlanPrice from "./PlanPrice";

export interface PlanProps {
  id?: number;
  name: string;
  description?: string;
  features?: any;
  created_at?: string;
}

export interface PlanResponse {
  id: number;
  name: string;
  description: string;
  features: any;
  created_at: string;
  plan_price: PlanPrice[];
}

export default class Plan {
  readonly id?: number;
  readonly name: string;
  readonly description?: string;
  readonly features?: any;
  readonly created_at?: string;

  constructor({ id, name, description, features, created_at }: PlanProps) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.features = features;
    this.created_at = created_at;
  }
}
