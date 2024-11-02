
import AccountChangePassword from "@/components/account/AccountChangePassword";
import AccountProfileCard from "@/components/account/AccountProfileCard";
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AccountProfile() {
    const session = await getCurrentSession();
    
    if (!session) {
        return <></>
    }
    let userData = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })
    if (!userData) {
        redirect("/signin");
    }
    userData.password = null;
    return (
        <div className="space-y-5">
            <AccountProfileCard userData={userData} />
            {userData.provider == "credentials" && (
                <AccountChangePassword userData={userData}/>
            )}
        </div>
    )
}
