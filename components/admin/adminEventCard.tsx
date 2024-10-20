"use client"

import { Event_Type, Event, Seat_Type } from "@prisma/client";
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DeleteIcon } from "../icons";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { motion } from 'framer-motion'
import { Chip } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import AdminSearchbar from "./adminSearchbar";

interface EventOutput extends Event {
    event_type: Event_Type,
    Seat_Type: Seat_Type[]
}

export default function AdminEventCard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen2, setOpen2] = useState<boolean>(false);
    const [mapData, setMapData] = useState<EventOutput | null>();
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [eventOnPage, setEventOnPage] = useState<EventOutput[] | null>(null);
    const [allEvent, setAllEvent] = useState<EventOutput[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const rowsPerPage = 40;

    useEffect(() => {
        const fetchData = async () => {
            setOnLoad(true)
            try {
                setAllEvent(null)
                const res = await fetch('/api/admin/event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ searchText: search }),
                });
                const output = await res.json();
                setAllEvent(output)
            } catch (error) {
                console.error('Error GET event:', error);
            }
        };
        fetchData();
    }, [search]);

    const changePage = (input: number) => {
        if (allEvent != null) {
            const start = (input - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            setLastPage(Math.ceil(allEvent.length / rowsPerPage));
            setPage(input)
            setEventOnPage(allEvent.slice(start, end))
        }
    }

    if (allEvent && onLoad) {
        changePage(1)
        setOnLoad(false)
    }

    const onOpen2 = () => {
        setOpen2(true)
    };

    const onClose2 = () => {
        setOpen2(false)
    };

    const deleteClick = (item: EventOutput | null) => {
        setMapData(item)
        onOpen()
    };


    const eventDetailClick = (item: EventOutput) => {
        setMapData(item)
        onOpen2()
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        let id: number = mapData?.event_id || 0;
        try {
            const res = await fetch('/api/admin/event', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
        onClose()
        onClose2()
    };

    return (
        <>
            <Modal backdrop={"blur"} isOpen={isOpen2} onClose={onClose2} size={"2xl"}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Edit</ModalHeader>
                        <Divider />
                        <form onSubmit={handleDelete}>
                            <ModalBody className="px-5 py-6 gap-3">
                                <motion.div className="space-y-2"
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <Card className="flex flex-col items-center px-5">
                                        <CardHeader className="w-full flex justify-center items-center border-2">
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
                                            <div className="p-3">
                                                <p className="uppercase font-bold px-3 py-5">Ticket</p>
                                                <div className="max-w-full px-5">
                                                    {mapData?.Seat_Type.map((seat, index) => (
                                                        <div key={seat.seat_id}>
                                                            <p className="text-medium font-medium">{seat.seat_name}</p>
                                                            <p className="text-small text-default-400 px-5">฿ {seat.seat_price}</p>
                                                            {index !== mapData?.Seat_Type.length - 1 && (
                                                                <Divider className="my-3" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' variant='shadow' className="uppercase w-full" radius="full" type="submit">Delete</Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>

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


            <div className="flex justify-between items-center w-full px-52 justify-items-center">
                <AdminSearchbar searchText={search} setSearchText={setSearch} />
            </div>

            {(!onLoad && eventOnPage != null && eventOnPage.length != 0) ? (
                <>
                    <div className="w-full h-fit my-10">
                        {eventOnPage.map((event: EventOutput) => (
                            <Card className="w-72 flex-shrink-0 overflow-hidden p-2" key={event.event_id}>
                                <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(event)}>
                                    <DeleteIcon />
                                </span>
                                <div onClick={() => eventDetailClick(event)}>
                                    <Image alt="Card background" className="object-fill w-full z-0" src={event.event_images} height={250} />
                                    <CardBody className="overflow-visible py-2 gap-3" >
                                        <div className="flex w-full justify-around items-center uppercase font-bold">
                                            <Button color="primary" radius="lg" variant="bordered" className="h-4/5">
                                                {new Date(event.event_start_date).getDate() + "-"}
                                                {new Date(event.event_start_date).getMonth() + "-"}
                                                {new Date(event.event_start_date).getFullYear()}
                                            </Button>
                                            <p className="text-center text-xl"> - </p>
                                            <Button color="primary" radius="lg" className="h-4/5">
                                                {new Date(event.event_last_date).getDate() + "-"}
                                                {new Date(event.event_last_date).getMonth() + "-"}
                                                {new Date(event.event_last_date).getFullYear()}
                                            </Button>
                                        </div>
                                        <p className="text-lg uppercase font-bold">{event.event_name}</p>
                                        <small className="text-default-500 truncate">{event.event_location}</small>
                                    </CardBody>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={lastPage}
                            onChange={(page) => changePage(page)}
                        />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <p className="text-xl text-default-500">No Data for Display.</p>
                </div>
            )}
        </>

    )
};
