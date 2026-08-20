"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requireUser } from "@/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { categorySchema, tagSchema } from "@/lib/validations/post"

export type TaxonomyFormState = {
  message?: string
  errors?: Record<string, string[] | undefined>
}

export async function createCategory(
  _prev: TaxonomyFormState,
  formData: FormData
): Promise<TaxonomyFormState> {
  await requireUser()

  const parsed = categorySchema.safeParse({ name: formData.get("name") })
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const slug = slugify(parsed.data.name)
  if (await prisma.category.findUnique({ where: { slug } })) {
    return { errors: { name: ["Essa categoria já existe."] } }
  }

  await prisma.category.create({ data: { name: parsed.data.name, slug } })

  revalidatePath("/admin/categorias")
  revalidatePath("/categorias")
  return { message: "Categoria criada." }
}

export async function deleteCategory(id: string) {
  await requireUser()

  await prisma.post.updateMany({ where: { categoryId: id }, data: { categoryId: null } })
  await prisma.category.delete({ where: { id } })

  revalidatePath("/admin/categorias")
  revalidatePath("/categorias")
}

export async function createTag(
  _prev: TaxonomyFormState,
  formData: FormData
): Promise<TaxonomyFormState> {
  await requireUser()

  const parsed = tagSchema.safeParse({ name: formData.get("name") })
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const slug = slugify(parsed.data.name)
  if (await prisma.tag.findUnique({ where: { slug } })) {
    return { errors: { name: ["Essa tag já existe."] } }
  }

  await prisma.tag.create({ data: { name: parsed.data.name, slug } })

  revalidatePath("/admin/tags")
  return { message: "Tag criada." }
}

export async function deleteTag(id: string) {
  await requireUser()

  await prisma.tag.delete({ where: { id } })
  revalidatePath("/admin/tags")
}
