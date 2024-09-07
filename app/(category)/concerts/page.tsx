"use client"
import { eventItems } from "@/config/site";
import CardSwiper from "@/components/CardSwiper";


export default function page() {
    return (
        <div>
            <CardSwiper items={eventItems} />
        </div>
    )
}
