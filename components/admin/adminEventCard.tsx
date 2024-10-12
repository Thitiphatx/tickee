"use client"

import { Event_Type, Event, Seat_Type } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DeleteIcon } from "../icons";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";

interface EventOutput extends Event {
    event_type: Event_Type,
    Seat_Type: Seat_Type[]
}

export default function AdminEventCard({ data }: { data: EventOutput[] }) {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [display, setDisplay] = useState(false);
    const [mapData, setMapData] = useState<EventOutput | null>();
    const [onLoad, setOnLoad] = useState<boolean>(true);

    if (data && onLoad) {
        setOnLoad(false)
    }

    const deleteClick = (item: EventOutput | null) => {
        setMapData(item)
        setDeleteAlert(true);
    };

    const deleteClose = () => {
        setMapData(null)
        setDeleteAlert(false);
    };

    const eventDetailClick = (item: EventOutput) => {
        setMapData(item)
        setDisplay(true);
    };

    const eventDetailClose = () => {
        setMapData(null)
        setDisplay(false);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        let id: number = mapData?.event_id || 0;
        try {
            const res = await fetch('/api/admin/deleteEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            {display && (
                <div>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={eventDetailClose}
                    />
                    <div className="absolute z-20 w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(mapData || null)}>
                            <DeleteIcon />
                        </span>
                        <Card className="grid grid-cols-1 lg:grid-cols-2">
                            <CardHeader className="w-full flex justify-center items-center">
                                <Image className="" width={"100%"} src={mapData?.event_images} />
                            </CardHeader>
                            <CardBody className="flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h1 className="text-xl font-bold">{mapData?.event_name}</h1>
                                    <div className="flex flex-row">
                                        <Chip size="sm" className="">{mapData?.event_type.et_name}</Chip>
                                    </div>

                                    <div className='p-2' dangerouslySetInnerHTML={{ __html: mapData?.event_intro || "" }} />
                                </div>
                                <div>
                                    <h2 className="uppercase font-bold">Ticket</h2>
                                    <div className="max-w-md">
                                        {mapData?.Seat_Type.map((seat, index) => (
                                            <div key={seat.seat_id}>
                                                <h4 className="text-medium font-medium">{seat.seat_name}</h4>
                                                <p className="text-small text-default-400">฿ {seat.seat_price}</p>
                                                {index !== mapData?.Seat_Type.length - 1 && (
                                                    <Divider className="my-4" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}

            {deleteAlert && (
                <form onSubmit={handleDelete}>
                    <button
                        className="absolute z-30 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={deleteClose}
                    />
                    <Card className="absolute z-40 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Delete</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                                <span className="uppercase font-semibold text-xl">Are You Sure ?</span>
                                <p className="text-danger text-lg">
                                    <span>Delete </span>
                                    {mapData?.event_name}
                                    <span> from Event ?</span>
                                </p>
                            </div>
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                        </CardBody>
                    </Card>
                </form>
            )}
            {!onLoad && data.map((event: EventOutput) => (
                <Card className="w-72 flex-shrink-0 overflow-hidden p-2" key={event.event_id}>
                    <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(event)}>
                        <DeleteIcon />
                    </span>
                    <Image alt="Card background" className="object-fill w-full z-0" src={event.event_images} height={250} />
                    <CardBody className="overflow-visible py-2 gap-3" onClick={() => eventDetailClick(event)}>
                        <div className="flex w-full justify-around items-center uppercase font-bold">
                            <Button color="primary" radius="lg" variant="bordered" className="h-4/5">
                                {event.event_start_date.getDate() + "-"}
                                {event.event_start_date.getMonth() + "-"}
                                {event.event_start_date.getFullYear()}
                            </Button>
                            <p className="text-center text-xl"> - </p>
                            <Button color="primary" radius="lg" className="h-4/5">
                                {event.event_last_date.getDate() + "-"}
                                {event.event_last_date.getMonth() + "-"}
                                {event.event_last_date.getFullYear()}
                            </Button>
                        </div>
                        <p className="text-lg uppercase font-bold">{event.event_name}</p>
                        <small className="text-default-500 truncate">{event.event_location}</small>
                    </CardBody>
                </Card>
            ))}
        </>

    )
};
