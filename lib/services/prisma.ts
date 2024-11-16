import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

const prisma = global.cachedPrisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.cachedPrisma = prisma;

export default prisma;
