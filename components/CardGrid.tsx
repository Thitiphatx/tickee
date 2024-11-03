"use client"

import { Address } from "@/types/data_type"
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Event } from "@prisma/client"
import { IconFaceSadTear } from "./icons"

export default function CardGrid({ items }: { items: Event[] }) {
    if (items.length > 0) {
        return (
            <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {items.map((event, index) => {
                        const address: Address = JSON.parse(event.event_location);
                        return (
                            <a href={`event/${event.event_id}`} key={index}>
                                <Card className="min-h-9">
                                    <Image alt={event.event_name} className="object-cover relative h-80 w-full"  src={event.event_images} width={"320px"} />
                                    <CardBody className="overflow-visible py-2">
                                        <p className="text-tiny uppercase">{event.event_start_date.toLocaleDateString('en-US', { day: 'numeric', month: 'long'})}</p>
                                        <p className="text-tiny uppercase font-bold truncate">{event.event_name}</p>
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
    } else {
        return (
            <div className="w-full min-h-1.5 flex flex-col justify-center items-center">
                <IconFaceSadTear width="5rem" height="5rem" />
                <h5 className="text-center mt-5">No event available now</h5>
            </div>
            
        )
    }

}
