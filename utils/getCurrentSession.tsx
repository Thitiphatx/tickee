import { authOptions } from "@/auth/auth";
import { getServerSession } from "next-auth";

export async function getCurrentSession() {
    const session = await getServerSession(authOptions);
    return session
}