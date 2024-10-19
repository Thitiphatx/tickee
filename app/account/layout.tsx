import VerticalAccountNavbar from "@/components/VerticalAccountNavbar";
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
