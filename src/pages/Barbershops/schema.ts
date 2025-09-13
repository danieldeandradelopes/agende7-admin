import { z } from "zod";

export const barberShopSchema = z
  .object({
    name: z.string(),
    cover: z.string(),
    address: z.string(),
    description: z.string(),
    auto_approve: z.boolean(),
    status_payment: z.string(),
    social_medias: z.string(),
    phones: z.string(),
    branding: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    subdomain: z.string(),
    timezone: z.string(),
    email: z.string(),
    document: z.string(),
    document_type: z.string(),
  })
  .superRefine(
    (
      {
        name,
        cover,
        address,
        description,
        auto_approve,
        status_payment,
        social_medias,
        phones,
        branding,
        latitude,
        longitude,
        subdomain,
        timezone,
        email,
        document,
        document_type,
      },
      ctx
    ) => {
      if (!email) {
        ctx.addIssue({
          code: "custom",
          message: "O campo email é obrigatório",
          path: ["email"],
        });
      }

      if (!name) {
        ctx.addIssue({
          code: "custom",
          message: "O campo name é obrigatório",
          path: ["name"],
        });
      }

      if (!cover) {
        ctx.addIssue({
          code: "custom",
          message: "O campo cover é obrigatório",
          path: ["cover"],
        });
      }

      if (!address) {
        ctx.addIssue({
          code: "custom",
          message: "O campo address é obrigatório",
          path: ["address"],
        });
      }

      if (!description) {
        ctx.addIssue({
          code: "custom",
          message: "O campo description é obrigatório",
          path: ["description"],
        });
      }

      if (!auto_approve) {
        ctx.addIssue({
          code: "custom",
          message: "O campo auto_approve é obrigatório",
          path: ["auto_approve"],
        });
      }

      if (!status_payment) {
        ctx.addIssue({
          code: "custom",
          message: "O campo status_payment é obrigatório",
          path: ["status_payment"],
        });
      }

      if (!social_medias) {
        ctx.addIssue({
          code: "custom",
          message: "O campo social_medias é obrigatório",
          path: ["social_medias"],
        });
      }

      if (!phones) {
        ctx.addIssue({
          code: "custom",
          message: "O campo phones é obrigatório",
          path: ["phones"],
        });
      }

      if (!branding) {
        ctx.addIssue({
          code: "custom",
          message: "O campo branding é obrigatório",
          path: ["branding"],
        });
      }

      if (!latitude) {
        ctx.addIssue({
          code: "custom",
          message: "O campo latitude é obrigatório",
          path: ["latitude"],
        });
      }

      if (!longitude) {
        ctx.addIssue({
          code: "custom",
          message: "O campo longitude é obrigatório",
          path: ["longitude"],
        });
      }

      if (!subdomain) {
        ctx.addIssue({
          code: "custom",
          message: "O campo subdomain é obrigatório",
          path: ["subdomain"],
        });
      }

      if (!timezone) {
        ctx.addIssue({
          code: "custom",
          message: "O campo timezone é obrigatório",
          path: ["timezone"],
        });
      }

      if (!email) {
        ctx.addIssue({
          code: "custom",
          message: "O campo email é obrigatório",
          path: ["email"],
        });
      }

      if (!document) {
        ctx.addIssue({
          code: "custom",
          message: "O campo document é obrigatório",
          path: ["document"],
        });
      }

      if (!document_type) {
        ctx.addIssue({
          code: "custom",
          message: "O campo document_type é obrigatório",
          path: ["document_type"],
        });
      }
    }
  );

export type BarberShopType = z.infer<typeof barberShopSchema>;
