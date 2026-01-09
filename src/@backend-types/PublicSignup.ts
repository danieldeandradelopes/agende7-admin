export interface PublicSignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  barbershop_name: string;
  subdomain: string;
  address?: string;
  description?: string;
  document: string;
  document_type: string;
  plan_price_id: number;
  addon_ids?: number[];
  is_trial: boolean;
}

export interface PublicSignupResponse {
  barbershop: {
    id: number;
    subdomain: string;
    name: string;
  };
  preferenceId?: string;
  paymentId?: number;
  amount?: number;
}
