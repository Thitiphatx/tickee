import { auth } from "@/auth/auth";
import AuthForm from "@/components/auth/AuthForm";

export default async function signInPage() {
    const session = await auth();
    console.log(session?.user)
    return (
        <div>
            <AuthForm />
        </div>
    )
}
