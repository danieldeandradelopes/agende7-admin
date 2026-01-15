export type NotificationType =
  | "expiration_7_days"
  | "expiration_3_days"
  | "expiration_1_day"
  | "expiration_today";

export interface SubscriptionNotificationProps {
  id?: number;
  subscription_id: number;
  notification_type: NotificationType;
  sent_at: string;
  created_at?: string;
}

export default class SubscriptionNotification {
  readonly id?: number;
  readonly subscription_id: number;
  readonly notification_type: NotificationType;
  readonly sent_at: string;
  readonly created_at?: string;

  constructor({
    id,
    subscription_id,
    notification_type,
    sent_at,
    created_at,
  }: SubscriptionNotificationProps) {
    this.id = id;
    this.subscription_id = subscription_id;
    this.notification_type = notification_type;
    this.sent_at = sent_at;
    this.created_at = created_at;
  }
}
