import VerticalAccountNavbar from "@/components/VerticalAccountNavbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
