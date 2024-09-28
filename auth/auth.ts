import { prisma } from "@/prisma/seed";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/signin'
    },
    providers: [
        Google,
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null
                }

                const existedUser = await prisma.user.findFirst({
                    where: { email: credentials.email }
                });
                if (!existedUser) {
                    return null
                }

                const passwordMatch = await compare(credentials.password as string, existedUser.password as string);
                if (!passwordMatch) {
                    return null
                }
                return {
                    id: existedUser.id,
                    email: existedUser.email,
                    name: existedUser.name
                };
            }
        })
    ],
    callbacks: {

    }
})