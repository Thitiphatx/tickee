"use client"
import { eventItems } from "@/config/site";
import CardSwiper from "@/components/CardSwiper";


export default function page() {
    return (
        <div>
            <h1 className="page-heading">Concerts</h1>
            <CardSwiper items={eventItems} />
        </div>
    )
}
