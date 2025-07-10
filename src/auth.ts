/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        if (
          !credentials?.email ||
          !credentials.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          console.log("Authorize failed: invalid input");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("Authorize failed: user not found");
          return null;
        }
        if (!user.passwordHash) {
          console.log("Authorize failed: user has no passwordHash");
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        console.log("Password valid?", isValid);

        if (!isValid) {
          console.log("Authorize failed: invalid password");
          return null;
        }

        // Cek role, misal cuma admin yang boleh login ke admin app
        if (user.role !== "ADMIN") {
          console.log("Authorize failed: user role not ADMIN");
          return null;
        }

        console.log("Authorize success for user:", user.email);

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Untuk OAuth providers, cek apakah user sudah ada dan role-nya ADMIN
      if (account?.provider && account.type === "oauth") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser && existingUser.role !== "ADMIN") {
          console.log("OAuth login denied: user role not ADMIN");
          return false; // Tolak login jika bukan admin
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = String((user as any).role);
        console.log("JWT callback - token updated role:", token.role);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = String(token.role ?? "");
        console.log("Session callback - session user:", session.user);
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  debug: true,
});