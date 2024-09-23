import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string,
        name: string?,
        email: string?,
        role: string?,
    }
    interface Session extends DefaultSession {
        user: User
    }
}