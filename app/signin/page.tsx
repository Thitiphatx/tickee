import AuthForm from "@/components/AuthForm";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function signInPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }

    return (
        <div>
            <AuthForm />
        </div>
    )
}
