"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { requireUser } from "@/auth"
import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/validations/post"

export type PostFormState = {
  message?: string
  errors?: Record<string, string[] | undefined>
}

function readForm(formData: FormData) {
  const excerpt = String(formData.get("excerpt") ?? "").trim()
  const categoryId = String(formData.get("categoryId") ?? "")

  return postSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: excerpt === "" ? undefined : excerpt,
    content: String(formData.get("content") ?? ""),
    categoryId: categoryId === "" ? undefined : categoryId,
    published: formData.get("published") === "true",
  })
}

function tagIdsFrom(formData: FormData) {
  return formData.getAll("tagIds").map(String).filter(Boolean)
}

export async function createPost(
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const user = await requireUser()

  const parsed = readForm(formData)
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const { title, slug, excerpt, content, categoryId, published } = parsed.data
  const tagIds = tagIdsFrom(formData)

  if (await prisma.post.findUnique({ where: { slug } })) {
    return { errors: { slug: ["Já existe um artigo com esse slug."] } }
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      published,
      authorId: user.id,
      categoryId,
      tags: { create: tagIds.map((tagId) => ({ tagId })) },
    },
  })

  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  revalidatePath(`/blog/${post.slug}`)
  redirect(`/admin/posts/${post.id}`)
}

export async function updatePost(
  id: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireUser()

  const parsed = readForm(formData)
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const { title, slug, excerpt, content, categoryId, published } = parsed.data
  const tagIds = tagIdsFrom(formData)

  const conflict = await prisma.post.findUnique({ where: { slug } })
  if (conflict && conflict.id !== id) {
    return { errors: { slug: ["Já existe um artigo com esse slug."] } }
  }

  const previous = await prisma.post.findUnique({ where: { id } })
  if (!previous) return { message: "Artigo não encontrado." }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt: excerpt ?? null,
      content,
      published,
      categoryId: categoryId ?? null,
      tags: { deleteMany: {}, create: tagIds.map((tagId) => ({ tagId })) },
    },
  })

  revalidatePath("/admin/posts")
  revalidatePath(`/admin/posts/${id}`)
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  if (previous.slug !== slug) revalidatePath(`/blog/${previous.slug}`)

  return { message: published ? "Artigo publicado." : "Rascunho salvo." }
}

export async function deletePost(id: string) {
  await requireUser()

  const post = await prisma.post.delete({ where: { id } })

  revalidatePath("/admin/posts")
  revalidatePath("/blog")
  revalidatePath(`/blog/${post.slug}`)
  redirect("/admin/posts")
}
