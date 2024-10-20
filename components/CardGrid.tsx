"use client"

import { Address } from "@/types/data_type"
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Event } from "@prisma/client"

export default function CardGrid({ items }: { items: Event[] }) {
    return (
        <>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {items.map((event, index) => {
                const address: Address = JSON.parse(event.event_location);
                return (
                    <a href={`editevent/${event.event_id}`} key={index}>
                    <Card>
                        <Image alt={event.event_name}  src={event.event_images} className="relative" width={"100%"} />
                        <CardBody className="overflow-visible py-2">
                            <p className="text-tiny uppercase">{event.event_start_date.toLocaleDateString('en-US', { day: 'numeric', month: 'long'})}</p>
                            <p className="text-tiny uppercase font-bold">{event.event_name}</p>
                            <small className="text-default-500 truncate">{`${address.address} ${address.city}, ${address.country}`}</small>
                        </CardBody>
                    </Card>
                </a>
                )
            }

                
            )}
        </div>
        </>
    )
}
