import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

export const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
})
