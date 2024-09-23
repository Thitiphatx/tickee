import AuthForm from "@/components/auth/AuthForm";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function signInPage() {
    const session = await getSession();
    if (session) {
        redirect("/");
    }
    return (
        <div>
            <AuthForm />
        </div>
    )
}
