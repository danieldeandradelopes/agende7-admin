export interface PushNotificationTokenProps {
  id?: number;
  user_id: number;
  token: string;
  device_info?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RegisterTokenRequest {
  token: string;
  device_info?: string;
}

export interface SendNotificationRequest {
  title: string;
  body: string;
}

export default class PushNotificationToken {
  readonly id?: number;
  readonly user_id: number;
  readonly token: string;
  readonly device_info?: string;
  readonly is_active?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    user_id,
    token,
    device_info,
    is_active,
    created_at,
    updated_at,
  }: PushNotificationTokenProps) {
    this.id = id;
    this.user_id = user_id;
    this.token = token;
    this.device_info = device_info;
    this.is_active = is_active ?? true;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
