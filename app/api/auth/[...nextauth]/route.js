import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},

  async signIn({ profile }) {
    try {
      // esrverless route -> means it is Lambda function that opens up only when it is called. it spins up server functions and make connection to database. We do not need to keep connected to server. -> dynamodb
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
