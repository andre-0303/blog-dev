import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return (
    <main>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>

          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}
