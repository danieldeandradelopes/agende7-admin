type NameType =
  | "products"
  | "notification"
  | "auto_approve"
  | "barbers"
  | "commissions";

export interface Feature {
  name: NameType;
  status: boolean;
}
