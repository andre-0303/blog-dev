import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "O título precisa de pelo menos 5 caracteres.")
    .max(150, "O título passa de 150 caracteres."),

  slug: z
    .string()
    .trim()
    .min(3, "O slug precisa de pelo menos 3 caracteres.")
    .max(150, "O slug passa de 150 caracteres.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use apenas letras minúsculas, números e hífens."
    ),

  excerpt: z
    .string()
    .trim()
    .max(300, "O resumo passa de 300 caracteres.")
    .optional(),

  content: z
    .string()
    .trim()
    .min(50, "O conteúdo precisa de pelo menos 50 caracteres."),

  categoryId: z.string().optional(),

  published: z.boolean(),
})

export type PostInput = z.infer<typeof postSchema>

export const categorySchema = z.object({
  name: z.string().trim().min(2, "O nome precisa de pelo menos 2 caracteres.").max(60),
})

export const tagSchema = categorySchema
