export type ReminderType =
  | "3_days_before"
  | "1_day_before"
  | "due_date"
  | "overdue_7_days";

export interface PaymentReminderProps {
  id?: number;
  payment_id: number;
  reminder_type: ReminderType;
  sent_at: string;
  created_at?: string;
}

export default class PaymentReminder {
  readonly id?: number;
  readonly payment_id: number;
  readonly reminder_type: ReminderType;
  readonly sent_at: string;
  readonly created_at?: string;

  constructor({
    id,
    payment_id,
    reminder_type,
    sent_at,
    created_at,
  }: PaymentReminderProps) {
    this.id = id;
    this.payment_id = payment_id;
    this.reminder_type = reminder_type;
    this.sent_at = sent_at;
    this.created_at = created_at;
  }
}
