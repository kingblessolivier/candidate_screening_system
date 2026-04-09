import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await res.json();
          if (!res.ok || !data.success) return null;
          return {
            id: data.data.user.id,
            name: data.data.user.name,
            email: data.data.user.email,
            image: data.data.user.avatar ?? null,
            role: data.data.user.role,
            backendToken: data.data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      // On initial sign-in, persist user data in the JWT
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.backendToken = (user as { backendToken?: string }).backendToken;
      }
      // For OAuth providers, sync user to backend and get a backendToken
      if (account && account.provider !== "credentials") {
        try {
          const res = await fetch(`${BACKEND_URL}/auth/oauth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: token.name,
              email: token.email,
              avatar: token.picture,
              provider: account.provider,
              providerId: account.providerAccountId,
            }),
          });
          const data = await res.json();
          if (data.success) {
            token.backendToken = data.data.token;
            token.role = data.data.user.role;
          }
        } catch {}
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session as { backendToken?: string }).backendToken = token.backendToken as string;
      }
      return session;
    },
  },
});
