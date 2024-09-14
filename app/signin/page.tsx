import { auth } from "@/auth/auth";
import AuthForm from "@/components/AuthForm";
import { redirect } from "next/navigation";

export default async function signInPage() {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <AuthForm />
        </div>
    )
}
