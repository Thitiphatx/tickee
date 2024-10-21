"use client"

import { siteConfig } from "@/config/site"
import { Link } from "@nextui-org/link"

export default function VerticalAccountNavbar() {
  return (
    <div>
        <ul className="list-disc">
            {siteConfig.navAccountItems.map((item, index)=> (
                <li key={index}>
                    <Link color="foreground" isBlock href={item.href}>{item.label}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
