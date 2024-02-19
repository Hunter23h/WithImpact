import { Github } from "lucide-react";
import { NextAuthOptions } from "next-auth";
import { session } from "@/lib/session";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const GOOGLE_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GITHUB_SECRET!;

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session,
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
