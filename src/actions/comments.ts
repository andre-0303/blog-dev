"use server"

import { createHash } from "node:crypto"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import { requireUser } from "@/auth"
import { prisma } from "@/lib/prisma"
import { commentSchema } from "@/lib/validations/comment"

export type CommentFormState = {
  message?: string
  ok?: boolean
  errors?: Record<string, string[] | undefined>
}

const RATE_LIMIT = { comentarios: 3, janelaMs: 60_000 }

/** Identifica a origem para limitar rajadas sem guardar o IP em texto claro. */
async function ipFingerprint() {
  const forwarded = (await headers()).get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim()
  if (!ip) return null

  return createHash("sha256")
    .update(`${ip}${process.env.AUTH_SECRET ?? ""}`)
    .digest("hex")
}

export async function createComment(
  postId: string,
  slug: string,
  _prev: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  // Honeypot: campo escondido que só um bot preenche. Responde como sucesso
  // para não ensinar ao robô qual foi a regra que o barrou.
  if (String(formData.get("website") ?? "")) {
    return { ok: true, message: "Comentário publicado." }
  }

  const parsed = commentSchema.safeParse({
    authorName: formData.get("authorName"),
    content: formData.get("content"),
  })
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  const ipHash = await ipFingerprint()
  if (ipHash) {
    const recentes = await prisma.comment.count({
      where: {
        ipHash,
        createdAt: { gt: new Date(Date.now() - RATE_LIMIT.janelaMs) },
      },
    })
    if (recentes >= RATE_LIMIT.comentarios) {
      return { message: "Você comentou várias vezes seguidas. Espere um minuto." }
    }
  }

  const post = await prisma.post.findFirst({
    where: { id: postId, published: true },
    select: { id: true },
  })
  if (!post) return { message: "Este artigo não aceita comentários." }

  await prisma.comment.create({
    data: {
      postId: post.id,
      authorName: parsed.data.authorName,
      content: parsed.data.content,
      ipHash,
    },
  })

  revalidatePath(`/blog/${slug}`)
  return { ok: true, message: "Comentário publicado." }
}

export async function deleteComment(id: string) {
  await requireUser()

  const comment = await prisma.comment.delete({
    where: { id },
    include: { post: { select: { slug: true } } },
  })

  revalidatePath("/admin/comentarios")
  revalidatePath(`/blog/${comment.post.slug}`)
}
