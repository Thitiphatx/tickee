import { auth } from "@/auth/auth";
import AuthForm from "@/components/auth/AuthForm";
import { redirect } from "next/navigation";

export default async function signInPage() {
    const session = await auth();
    if (session) {
        redirect("/");
    }
    return (
        <div>
            <AuthForm />
        </div>
    )
}
