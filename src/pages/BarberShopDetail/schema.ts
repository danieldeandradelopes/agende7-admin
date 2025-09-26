import { z } from "zod";

export const updateBarberShopSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  cover: z.string().optional(),
  description: z.string().min(1, "Descrição é obrigatória"),
  subdomain: z.string().min(1, "Subdomínio é obrigatório"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email({ message: "O campo email deve ser um email válido" }),
  document: z.string().min(1, "Documento é obrigatório"),
  document_type: z.enum(["cpf", "cnpj"], {
    required_error: "Tipo de documento é obrigatório",
  }),
  auto_approve: z.string().optional(),
  timezone: z.string().optional(),
});

export type UpdateBarberShopType = z.infer<typeof updateBarberShopSchema>;
