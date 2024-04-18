import User from "@models/user";
import { ConnectToDatabase } from "@utils/database";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log("Sign in profile:", profile);
        await ConnectToDatabase();
        // Check if the user is already in the database
        const user = await User.findOne({ email: profile.email });
        // If not, create a new user
        if (!user) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
