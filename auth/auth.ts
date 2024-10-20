import { prisma } from "@/prisma/seed";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email'},
                password: { label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
            
                if (!email || !password) {
                    return null;
                }
            
                const user = await prisma.user.findFirst({
                    where: { email }
                });
            
                if (!user) {
                    return null;
                }
            
                const matched = await compare(password, user.password as string);
            
                if (!matched) {
                    return null;
                }
            
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                // If a new user signs in, assign token from user object
                token.id = user.id;
                token.name = user.name;
                token.role = user.role;
            }

            if (account?.provider == "google") {
                token.id = profile?.sub!,
                token.email = profile?.email!,
                token.name = profile?.name!,
                token.provider = "google"
            }
            
            // Fetch fresh user data from the database every time the token is requested
            const dbUser = await prisma.user.findFirst({
                where: { id: token.id as string }
            });

    
            if (dbUser) {
                token.name = dbUser.name;
                token.role = dbUser.role;
                token.email = dbUser.email;
            }
    
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            // Sync session with updated token data
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
    
            return session;
        }
    },
    // callbacks: {
    //     async jwt({ token, user, account, profile, trigger }) {
    //         if (user) {
    //             return {
    //                 ...token,
    //                 id: user.id,
    //                 name: user.name,
    //                 role: user.role
    //             }
    //         }
    //         if (account?.provider === "google") {
    //                 let existedUser = await prisma.user.findFirst({
    //                     where: { email: profile?.email }
    //                 });
    
    //                 if (!existedUser) {
    //                     existedUser = await prisma.user.create({
    //                         data: {
    //                             id: profile?.sub!,
    //                             email: profile?.email!,
    //                             name: profile?.name!,
    //                             provider: "google"
    //                         }
    //                     });
    //                 }
    
    //                 token.id = existedUser.id;
    //                 token.role = existedUser.role;
    //         }
    //         return token
    //     },
    //     async session({ session, token }: { session: any; token: any }) {
    //         if (token) {
    //             session.user.role = token.role;
    //             session.user.email = token.email;
    //             session.user.id = token.id;
    //             session.user.name = token.name;
    //         }
            
    //         return session;
    //     }
    // },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.AUTH_SECRET
}