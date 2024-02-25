import { Github } from "lucide-react";
import { NextAuthOptions } from "next-auth";
import { session } from "@/lib/session";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

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
    async signIn({ account, profile, user }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      if (account.provider === "github") {
        // console.log("account info: ", account);
        const { access_token, providerAccountId } = account;

        try {
          const response = await axios.post("http://localhost:8000/github/", {
            access_token: access_token,
            id_token: providerAccountId,
          });
          const { key } = response.data;
          user.key = key;

          // const getCSRFToken = () => {
          //   const csrfToken = document.cookie
          //     .split("; ")
          //     .find((row) => row.startsWith("csrftoken"))
          //     ?.split("=")[1];
          //   return csrfToken;
          // };

          // // Include the CSRF token in the request header
          // axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();
          // try {
          //   await axios.post(
          //     "http://localhost:8000/addavatar/",
          //     {
          //       avatar_url: profile.avatar_url,
          //       username: profile.login,
          //     }
          //     // {
          //     //   headers: {
          //     //     'X-CSRFToken': getCSRFToken(),
          //     //   }
          //     // }
          //   );
          // } catch (error) {
          //   console.error("Error updating avatar in Django:", error);
          // }
          return true;
        } catch (error) {
          return false;
        }
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
        token.username = profile.login;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
