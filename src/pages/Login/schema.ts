import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(6, { message: "É necessário no mínimo 6 caracteres" }),
  })
  .superRefine(({ email, password }, ctx) => {
    if (!email) {
      ctx.addIssue({
        code: "custom",
        message: "O campo email é obrigatório",
        path: ["email"],
      });
    }

    if (!password) {
      ctx.addIssue({
        code: "custom",
        message: "O campo senha é obrigatório",
        path: ["password"],
      });
    }
  });

export type LoginType = z.infer<typeof loginSchema>;
