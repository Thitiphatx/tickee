import { auth } from "@/auth/auth";
import AccountChangePassword from "@/components/account/AccountChangePassword";
import AccountProfileCard from "@/components/account/AccountProfileCard";
import { prisma } from "@/prisma/seed";
import { redirect } from "next/navigation";

export default async function AccountProfile() {
    const session = await auth();
    const userData = await prisma.user.findFirst({
        where: {
            id: session?.user?.id
        }
    })
    console.log(userData)
    if (!userData) {
        redirect("/signin");
    }
    return (
        <div>
            <AccountProfileCard userData={userData} />
        </div>
    )
}
