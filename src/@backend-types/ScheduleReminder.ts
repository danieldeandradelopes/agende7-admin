interface ScheduleReminderProps {
  id?: number;
  schedule_id: number;
  customer_id: number;
  sent_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export default class ScheduleReminder {
  readonly id?: number;
  readonly schedule_id: number;
  readonly customer_id: number;
  readonly sent_at?: Date;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor({
    id,
    schedule_id,
    customer_id,
    sent_at,
    created_at,
    updated_at,
  }: ScheduleReminderProps) {
    this.id = id;
    this.schedule_id = schedule_id;
    this.customer_id = customer_id;
    this.sent_at = sent_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
