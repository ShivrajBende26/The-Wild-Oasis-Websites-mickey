import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "development-only-auth-secret-change-in-production",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      if (!user.email) {
        console.error("Google sign-in did not provide an email address.");
        return false;
      }

      const existingGuest = await getGuest(user.email);

      if (!existingGuest)
        await createGuest({ email: user.email, fullName: user.name });

      return true;
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      if (!guest) throw new Error("No guest profile exists for this session.");
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
