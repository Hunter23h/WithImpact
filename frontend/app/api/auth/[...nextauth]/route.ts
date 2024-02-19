import { Github } from "lucide-react";
import { NextAuthOptions } from "next-auth";
import { session } from "@/lib/session";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          userName: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
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
      // console.log(profile)
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.username = token.username;
      }
      return session;
    },
    jwt: async ({ user, token, profile }) => {
      if (user) {
        token.sub = user.id;
        token.username = profile.login
      }
      return token;
    },
  },
  };

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
