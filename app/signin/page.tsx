import AuthForm from "@/components/auth/AuthForm";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";

export default async function signInPage() {
    const session = await getCurrentSession();
    if (session) {
        redirectingByRole(session)
    }
    return (
        <div>
            <AuthForm />
        </div>
    )
}
