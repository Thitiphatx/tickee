"use client"

import { Event_Type, Event, Seat_Type } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DeleteIcon } from "../icons";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import DisplayEventModal from "./displayEventModal";

interface EventOutput extends Event {
    event_type: Event_Type,
    Seat_Type: Seat_Type[]
}

export default function AdminEventCard({ data }: { data: EventOutput[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [display, setDisplay] = useState(false);
    const [mapData, setMapData] = useState<EventOutput | null>();
    const [onLoad, setOnLoad] = useState<boolean>(true);

    if (data && onLoad) {
        setOnLoad(false)
    }

    const deleteClick = (item: EventOutput | null) => {
        setMapData(item)
        onOpen()
    };


    const eventDetailClick = (item: EventOutput) => {
        setMapData(item)
        setDisplay(true);
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
        onClose()
    };

    return (
        <>
            <DisplayEventModal data={mapData || null} display={display} setDisplay={setDisplay}/>

            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleDelete}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Delete</ModalHeader>
                                <Divider />
                                <ModalBody className="px-10 py-6 gap-3">
                                    <span className="uppercase font-semibold text-danger text-lg">Are You Sure ?</span>
                                    <p className="text-md capitalize">
                                        <span>To Delete </span>
                                        <span className="underline underline-offset-2 text-danger">{mapData?.event_name}</span>
                                        <span> from Event </span>
                                    </p>
                                    <p className="text-md capitalize">
                                        <span>No Return after this point</span>
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" variant='solid' type="submit">
                                        Confirm
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>

            {!onLoad && data.map((event: EventOutput) => (
                <Card className="w-72 flex-shrink-0 overflow-hidden p-2" key={event.event_id}>
                    <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(event)}>
                        <DeleteIcon />
                    </span>
                    <div onClick={() => eventDetailClick(event)}>
                        <Image alt="Card background" className="object-fill w-full z-0" src={event.event_images} height={250} />
                        <CardBody className="overflow-visible py-2 gap-3" >
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
                    </div>
                </Card>
            ))}
        </>

    )
};
