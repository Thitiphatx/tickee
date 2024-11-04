import VerticalAccountNavbar from "@/components/VerticalAccountNavbar";
import { RoleAvailable } from "@/types/data_type";
import { redirectingByRole } from "@/utils/function";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getCurrentSession();
    if (!session) {
        redirect("/signin")
    }
    // else if (session?.user.role != RoleAvailable.User && session) {
    //     redirectingByRole(session)
    // }
    return (
        <div className="grid lg:grid-cols-4">
            <div className="w-full">
                <VerticalAccountNavbar />
            </div>
            <div className="w-full lg:col-span-3">
                {children}
            </div>
            
        </div>
    
    );
}
