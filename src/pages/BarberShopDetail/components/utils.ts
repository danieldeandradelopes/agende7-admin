import { formatDate } from "@/utils/date";

// Função auxiliar para formatar datas com segurança
export const safeFormatDate = (date: string | undefined | null): string => {
  if (!date) return "N/A";
  try {
    return formatDate(date);
  } catch {
    try {
      return new Date(date).toLocaleDateString("pt-BR");
    } catch {
      return date;
    }
  }
};
