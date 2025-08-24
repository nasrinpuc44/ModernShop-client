import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple in-memory user store for demo purposes
const users = [
  {
    id: "2",
    email: "nifahad61814@gmail.com",
    password: "fahad61814",
    name: "ni fahad",
  },
  {
    id: "3",
    email: "nifahad@gmail.com",
    password: "fahad61814",
    name: "Nahidul islam Fahad",
  },
  {
    id: "4",
    email: "snasrin291@gmail.com",
    password: "123xyz1237",
    name: "snasrin291",
  },
];

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
