import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in the hosting provider's environment variables (must point to a MySQL server reachable from that environment, not localhost)."
    );
  }
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Constructed lazily (on first property access) rather than at module load,
// since Next.js imports route modules at build time to collect page data —
// eagerly building the mariadb adapter there crashes when DATABASE_URL isn't
// present in the build environment (e.g. Vercel without the env var set).
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrismaClient(), prop, receiver);
  },
});
