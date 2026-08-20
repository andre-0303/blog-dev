import { z } from "zod"

export const commentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Escreva pelo menos 2 caracteres no nome.")
    .max(50, "O nome passa de 50 caracteres."),

  content: z
    .string()
    .trim()
    .min(3, "O comentário está curto demais.")
    .max(2000, "O comentário passa de 2000 caracteres."),
})
