import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers:[
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<User | null> {
                const users = [
                    {
                        id: "test-1",
                        email: "a@test.com",
                        password: "pass"
                    },
                    {
                        id: "test-2",
                        email: "b@test.com",
                        password: "pass"
                    }
                ]
                const user = users.find(
                    (user) =>
                        user.email === credentials?.email &&
                        user.password === credentials?.password
                );
                return user ? { id: user.id, email:user.email }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}