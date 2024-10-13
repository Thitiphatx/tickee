"use client"

import { Event, Event_Type, Seat_Type } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { motion } from 'framer-motion'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";

interface EventOutput extends Event {
    event_type: Event_Type,
    Seat_Type: Seat_Type[]
}


interface EditUserModalProps {
    data: EventOutput | null;
    display: boolean;
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DisplayEventModal({ data, display, setDisplay }: EditUserModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [displayDetail, setDisplayDetail] = useState<boolean>(false);

    if (data && onLoad) {
        setOnLoad(false)
    }

    if (display && !displayDetail) {
        setDisplayDetail(true)
        onOpen()
    }
    const closeDisplay = () => {
        setDisplay(false)
        setDisplayDetail(false)
        onClose()
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        let id: number = data?.event_id || 0;
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
        closeDisplay()
    };

    return (
        <>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={closeDisplay} size={"2xl"}>
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
                                            <Image className="" width={"100%"} src={data?.event_images} />
                                        </CardHeader>
                                        <CardBody className="flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <h1 className="text-xl font-bold">{data?.event_name}</h1>
                                                <div className="flex flex-row">
                                                    <Chip size="sm" className="">{data?.event_type.et_name}</Chip>
                                                </div>

                                                <div className='p-2' dangerouslySetInnerHTML={{ __html: data?.event_intro || "" }} />
                                            </div>
                                            <div className="p-3">
                                                <p className="uppercase font-bold px-3 py-5">Ticket</p>
                                                <div className="max-w-full px-5">
                                                    {data?.Seat_Type.map((seat, index) => (
                                                        <div key={seat.seat_id}>
                                                            <p className="text-medium font-medium">{seat.seat_name}</p>
                                                            <p className="text-small text-default-400 px-5">฿ {seat.seat_price}</p>
                                                            {index !== data?.Seat_Type.length - 1 && (
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
        </>
    )
};
