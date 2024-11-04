"use client"

import { siteConfig } from "@/config/site"
import { RoleAvailable } from "@/types/data_type";
import { Link } from "@nextui-org/link"
import { useSession } from "next-auth/react";

export default function VerticalAccountNavbar() {
  const { data: session, status } = useSession();
  return (
    <div>
        <ul className="list-disc">
            {siteConfig.navAccountItems.filter((item) => ((item.label == "Profile" && session?.user.role != RoleAvailable.User) || session?.user.role == RoleAvailable.User)).map((item, index)=> (
                <li key={index}>
                    <Link color="foreground" isBlock href={item.href}>{item.label}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
