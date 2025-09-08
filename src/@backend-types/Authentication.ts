import Phone from "./Phone";
import User from "./User";
import WorkingHours from "./WorkingHours";

export interface BarberShopAuthentication {
  id: number;
  name: string;
  cover?: string;
  address?: string;
  description?: string;
  status_payment?: string;
  specialties?: string;
  bio?: string;
  rate?: number;
  working_hours?: WorkingHours[];
  phones?: Phone[];
  latitude?: number;
  longitude?: number;
  created_at?: Date;
  updated_at?: Date;
}

export default class Authentication {
  constructor(
    readonly user: User,
    readonly token: string,
    readonly barbershop?: BarberShopAuthentication | null,
    readonly phones?: Phone[] | null
  ) {}
}
