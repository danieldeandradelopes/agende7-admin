import { z } from "zod";

export const featureSchema = z.object({ name: z.string() });

export const createBarberShopWithTemplateSchema = z.object({
  name: z.string(),
  address: z.string(),
  cover: z.string(),
  description: z.string(),
  subdomain: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  features: z.array(featureSchema),
  phone: z.string(),
  email: z
    .string()
    .email({ message: "O campo email deve ser um email válido" }),
  document: z.string(),
  documentType: z.enum(["cpf", "cnpj"]),
});
