export interface TimeSlotProps {
  id: number;
  working_hour_id: number;
  time_slot: string;
  created_at?: string;
  updated_at?: string;
}

export default class TimeSlot {
  readonly id: number;
  readonly working_hour_id: number;
  readonly time_slot: string;
  readonly created_at?: string;
  readonly updated_at?: string;

  constructor({
    id,
    working_hour_id,
    time_slot,
    created_at,
    updated_at,
  }: TimeSlotProps) {
    this.id = id;
    this.working_hour_id = working_hour_id;
    this.time_slot = time_slot;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
