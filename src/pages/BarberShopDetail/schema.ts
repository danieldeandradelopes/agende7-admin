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

export const createSubscriptionSchema = z.object({
  plan_price_id: z.number().min(1, "ID do plano/preço é obrigatório"),
  start_date: z.string().min(1, "Data de início é obrigatória"),
  status: z.enum(["active", "past_due", "canceled"]).optional(),
  end_date: z.string().optional(),
  trial_end_date: z.string().optional(),
});

export type CreateSubscriptionType = z.infer<typeof createSubscriptionSchema>;

export const createSubscriptionAddonSchema = z.object({
  addon_id: z.number().min(1, "ID do addon é obrigatório"),
  addon_price_id: z.number().min(1, "ID do preço do addon é obrigatório"),
  start_date: z.string().min(1, "Data de início é obrigatória"),
  status: z.enum(["active", "past_due", "canceled"]).optional(),
  end_date: z.string().optional(),
});

export type CreateSubscriptionAddonType = z.infer<
  typeof createSubscriptionAddonSchema
>;

export const updateWorkingHoursSchema = z.object({
  week_day: z.string().min(1, "Dia da semana é obrigatório"),
  time_slots: z.array(z.string()).min(1, "Pelo menos um horário é obrigatório"),
  is_open: z.boolean(),
});

export type UpdateWorkingHoursType = z.infer<typeof updateWorkingHoursSchema>;

export const createWorkingHoursSchema = z.object({
  days: z
    .array(
      z.object({
        week_day: z.string().min(1, "Dia da semana é obrigatório"),
        time_slots: z
          .array(z.string())
          .min(1, "Pelo menos um horário é obrigatório"),
        is_open: z.boolean(),
      })
    )
    .min(1, "Pelo menos um dia é obrigatório"),
});

export type CreateWorkingHoursType = z.infer<typeof createWorkingHoursSchema>;

export const updateManifestSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  short_name: z.string().min(1, "Nome curto é obrigatório"),
  start_url: z.string().optional(),
  display: z.string().optional(),
  theme_color: z.string().optional(),
  background_color: z.string().optional(),
  icons: z
    .array(
      z.object({
        src: z.string(),
        sizes: z.string(),
        type: z.string(),
      })
    )
    .optional(),
  extra: z.record(z.any()).optional(),
});

export type UpdateManifestType = z.infer<typeof updateManifestSchema>;

export const updateBrandingSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  theme: z.enum(["light", "dark", "custom"]).optional(),
  // Paleta base
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  tertiary_color: z.string().optional(),
  quaternary_color: z.string().optional(),
  background_color: z.string().optional(),
  surface_color: z.string().optional(),
  text_primary_color: z.string().optional(),
  text_secondary_color: z.string().optional(),
  border_color: z.string().optional(),
  error_color: z.string().optional(),
  success_color: z.string().optional(),
  // Botões
  btn_primary_bg: z.string().optional(),
  btn_primary_text: z.string().optional(),
  btn_secondary_bg: z.string().optional(),
  btn_secondary_text: z.string().optional(),
  btn_tertiary_bg: z.string().optional(),
  btn_tertiary_text: z.string().optional(),
  btn_quaternary_bg: z.string().optional(),
  btn_quaternary_text: z.string().optional(),
  // Textos
  heading_color: z.string().optional(),
  subheading_color: z.string().optional(),
  text_default: z.string().optional(),
  text_muted: z.string().optional(),
  link_color: z.string().optional(),
  link_hover_color: z.string().optional(),
  // Inputs
  input_bg: z.string().optional(),
  input_text: z.string().optional(),
  input_border: z.string().optional(),
  input_placeholder: z.string().optional(),
  input_focus_border: z.string().optional(),
  // Containers
  app_background: z.string().optional(),
  card_background: z.string().optional(),
  card_border: z.string().optional(),
  card_shadow: z.string().optional(),
  // Drawer/Sidebar
  drawer_bg: z.string().optional(),
  drawer_text: z.string().optional(),
  drawer_border: z.string().optional(),
  drawer_hover_bg: z.string().optional(),
  drawer_active_bg: z.string().optional(),
  // Assets
  logo: z.string().optional(),
  favicon: z.string().optional(),
});

export type UpdateBrandingType = z.infer<typeof updateBrandingSchema>;
