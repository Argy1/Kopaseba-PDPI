import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const LOCKOUT_MINUTES = 15;
const MAX_ATTEMPTS = 5;

class InvalidLoginError extends CredentialsSignin {
  code = "invalid-credentials";
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    uid?: string;
    sessionVersion?: number;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : undefined;
        const password = typeof credentials?.password === "string" ? credentials.password : undefined;
        if (!email || !password) throw new InvalidLoginError();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new InvalidLoginError();

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new InvalidLoginError();
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          const attempts = user.failedLoginAttempts + 1;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: attempts,
              lockedUntil: attempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000) : null,
            },
          });
          throw new InvalidLoginError();
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
        });

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.sessionVersion = (user as { sessionVersion: number }).sessionVersion;
        return token;
      }

      if (!token.uid) return null;

      const dbUser = await prisma.user.findUnique({
        where: { id: Number(token.uid) },
        select: { sessionVersion: true },
      });
      if (!dbUser || dbUser.sessionVersion !== token.sessionVersion) {
        return null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.uid) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
});
