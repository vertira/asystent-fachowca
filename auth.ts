import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import Discord from "next-auth/providers/discord";
import { getUserByEmail } from "./lib/server-actions";
import { compare } from "bcryptjs";
export const { auth, handlers, signIn, unstable_update } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const email = credentials.email as string;
          const password = credentials.password as string;
          if (!email || !password) {
            throw new CredentialsSignin("MISSINGINPUT");
          }
          let user = null;

          // logic to verify if user exists
          user = await getUserByEmail(email);

          if (!user) {
            throw new CredentialsSignin("MISSINGMATCH");
          }
          if (!user.password) {
            throw new CredentialsSignin("MISSINGMATCH");
          }
          const isMatched = await compare(password, user.password);
          if (!isMatched) {
            throw new CredentialsSignin("MISSINGMATCH");
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.employerId = user.employerId;
      }
      if (trigger === "update") {
        token.picture = session.user.image;
        token.name = session.user.name;
        token.email = session.user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          employerId: token.employerId,
        },
      };
    },
    signIn: async ({ account }) => {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
