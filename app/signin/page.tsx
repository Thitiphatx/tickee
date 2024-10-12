import AuthForm from "@/components/auth/AuthForm";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function signInPage() {
    const session = await getCurrentSession();
    if (session) {
        redirect("/");
    }
    return (
        <div>
            <AuthForm />
        </div>
    )
}
