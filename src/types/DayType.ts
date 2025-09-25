export enum DayTranslation {
  "monday" = "Segunda",
  "tuesday" = "Terça",
  "wednesday" = "Quarta",
  "thursday" = "Quinta",
  "friday" = "Sexta",
  "saturday" = "Sábado",
  "sunday" = "Domingo",
}

export interface Day {
  id: number;
  name: keyof typeof DayTranslation; // Define que o nome do dia deve ser uma chave válida do enum
  enabled: boolean;
}
