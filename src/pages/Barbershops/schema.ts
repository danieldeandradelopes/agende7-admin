import { z } from "zod";

export const featureSchema = z.object({
  name: z.string(),
});

export const createBarberShopWithTemplateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  cover: z.string().min(1, "Cover é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  subdomain: z.string().min(1, "Subdomínio é obrigatório"),
  latitude: z.number({ required_error: "Latitude é obrigatória" }),
  longitude: z.number({ required_error: "Longitude é obrigatória" }),
  features: z.array(featureSchema).default([]), // não obrigatório
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email({ message: "O campo email deve ser um email válido" }),
  document: z.string().min(1, "Documento é obrigatório"),
  document_type: z.enum(["cpf", "cnpj"], {
    required_error: "Tipo de documento é obrigatório",
  }),
});
