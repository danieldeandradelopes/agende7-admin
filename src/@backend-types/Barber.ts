interface BarberProps {
  id: number;
  user_id: number;
  barber_shop_id: number;
  is_active: boolean;
  available_hours: AvailableHour[];
  name: string;
  bio: string;
  phone: string;
  rate: number;
  digital_comission: number;
  physical_comission: number;
  services_comission: number;
  avatar?: string;
  email?: string;
  specialties?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBarberRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  digital_comission: number;
  physical_comission: number;
  services_comission: number;
  avatar?: string;
}

export interface BarberListResponse {
  id: number;
  name: string;
  email: string;
  access_level: string;
  avatar: string | null;
  phone: string;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  user_id: number;
  barber_shop_id: number;
  specialties: string | null;
  bio: string | null;
  is_active: boolean;
  rate: string;
  digital_comission: string;
  physical_comission: string;
  services_comission: string;
}

export class AvailableHour {
  constructor(readonly time: string) {}
}

export default class Barber {
  readonly id: number;
  readonly user_id: number;
  readonly barber_shop_id: number;
  readonly is_active: boolean;
  readonly available_hours: AvailableHour[];
  readonly name: string;
  readonly bio: string;
  readonly phone: string;
  readonly rate: number;
  readonly digital_comission: number;
  readonly physical_comission: number;
  readonly services_comission: number;
  readonly avatar?: string;
  readonly email?: string;
  readonly specialties?: string;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    user_id,
    barber_shop_id,
    is_active,
    available_hours,
    name,
    bio,
    phone,
    rate,
    digital_comission,
    physical_comission,
    services_comission,
    avatar,
    email,
    specialties,
    created_at,
    updated_at,
  }: BarberProps) {
    this.id = id;
    this.user_id = user_id;
    this.barber_shop_id = barber_shop_id;
    this.is_active = is_active;
    this.available_hours = available_hours;
    this.name = name;
    this.bio = bio;
    this.phone = phone;
    this.rate = rate;
    this.digital_comission = digital_comission;
    this.physical_comission = physical_comission;
    this.services_comission = services_comission;
    this.avatar = avatar;
    this.email = email;
    this.specialties = specialties;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
