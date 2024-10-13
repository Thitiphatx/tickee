"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import { Receipt, Seat_Dispatch, Seat_Type, User, Event } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DeleteIcon, EditIcon } from "../icons";
import { ReceiptStatus } from "@/types/data_type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";

interface Seat extends Seat_Type {
    event_seat: Event,
    Seat_Dispatch: Seat_Dispatch
}

interface ReturnOrder extends Receipt {
    rec_customer: User,
    rec_seat: Seat
}


export default function ReturnRequest({ data }: { data: any[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen2, setOpen2] = useState<boolean>(false);
    const [reject, setReject] = useState(false);
    const [accept, setAccept] = useState(false);
    const [orderID, setOrderID] = useState<number>(0);
    const [onLoad, setOnLoad] = useState<boolean>(true);

    if (data && onLoad) {
        setOnLoad(false)
    }

    const onOpen2 = () => {
        setOpen2(true)
    };

    const onClose2 = () => {
        setOpen2(false)
    };

    const rejectOrder = (id: number) => {
        setOrderID(id)
        onOpen2()
    };

    const acceptOrder = (id: number) => {
        setOrderID(id)
        onOpen()
    };


    const handleAccept = async (e: React.FormEvent) => {
        e.preventDefault();
        let status: number = ReceiptStatus.ReturnSuccess;
        let id: number = orderID
        try {
            const res = await fetch('/api/admin/returning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status, id }),
            });

        } catch (error) {
            console.error('Error Accept:', error);
        }
    };

    const handleReject = async (e: React.FormEvent) => {
        e.preventDefault();
        let status: number = ReceiptStatus.UnableToReturn;
        let id: number = orderID
        try {
            const res = await fetch('/api/admin/returning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status, id }),
            });

        } catch (error) {
            console.error('Error Accept:', error);
        }
    };

    return (
        <>
            {accept && (
                // <form onSubmit={handleAccept}>
                //     <button
                //         className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                //         onClick={acceptOrderClose}
                //     />
                //     <Card className="absolute z-20 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                //         <CardHeader className="bg-foreground bg-opacity-10">
                //             <h1 className="mx-auto text-3xl font-bold uppercase">Returning</h1>
                //         </CardHeader>
                //         <CardBody className="overflow-hidden">
                //             <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                //                 <span className="uppercase font-semibold text-xl">Accept Returning</span>
                //                 <p className="text-danger text-lg">
                //                     <span>Receipt ID </span>
                //                     {orderID}
                //                     <span> Returning Success?</span>
                //                 </p>
                //             </div>
                //             <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                //         </CardBody>
                //     </Card>
                // </form>
                <></>

            )}
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleAccept}>
                    <ModalContent>
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Returning</ModalHeader>
                            <Divider />
                            <ModalBody className="px-10 py-6 gap-3">
                                <span className="uppercase font-semibold text-danger text-lg">Accept Returning</span>
                                <p className="text-md capitalize">
                                    <span>Receipt ID  </span>
                                    <span className="underline underline-offset-2 text-danger">{orderID}</span>
                                    <span> Returning will be Success?</span>
                                </p>
                                <p className="text-md capitalize">
                                    <span>No Return after this point</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" variant='shadow' type="submit">
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    </ModalContent>
                </form>
            </Modal>

            <Modal backdrop={"blur"} isOpen={isOpen2} onClose={onClose2}>
                <form onSubmit={handleReject}>
                    <ModalContent>
                        {(onClose2) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Returning</ModalHeader>
                                <Divider />
                                <ModalBody className="px-10 py-6 gap-3">
                                    <span className="uppercase font-semibold text-danger text-lg">Reject Returning</span>
                                    <p className="text-md capitalize">
                                        <span>Receipt ID  </span>
                                        <span className="underline underline-offset-2 text-danger">{orderID}</span>
                                        <span> Unable to Return?</span>
                                    </p>
                                    <p className="text-md capitalize">
                                        <span>No Return after this point</span>
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="default" variant="light" onPress={onClose2}>
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

            {reject && (
                <></>
                // <form onSubmit={handleReject}>
                //     <button
                //         className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                //         onClick={rejectOrderClose}
                //     />
                //     <Card className="absolute z-20 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                //         <CardHeader className="bg-foreground bg-opacity-10">
                //             <h1 className="mx-auto text-3xl font-bold uppercase">Returning</h1>
                //         </CardHeader>
                //         <CardBody className="overflow-hidden">
                //             <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                //                 <span className="uppercase font-semibold text-xl">Reject Returning</span>
                //                 <p className="text-danger text-lg">
                //                     <span>Receipt ID </span>
                //                     {orderID}
                //                     <span>Unable to Return?</span>
                //                 </p>
                //             </div>
                //             <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                //         </CardBody>
                //     </Card>
                // </form>
            )}
            {!onLoad && (
                <Table className="p-8" selectionMode="single" color="default" >
                    <TableHeader>
                        <TableColumn align="center">USER</TableColumn>
                        <TableColumn align="center">EMAIL</TableColumn>
                        <TableColumn align="center">EVENT</TableColumn>
                        <TableColumn align="center">SEAT / ZONE</TableColumn>
                        <TableColumn align="center">TOTAL PRICE</TableColumn>
                        <TableColumn align="center">STATUS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No Data for Display."}>
                        {data.map((item: ReturnOrder) => (
                            <TableRow key={item.rec_id}>
                                <TableCell>{item.rec_customer.name}</TableCell>
                                <TableCell>{item.rec_customer.email}</TableCell>
                                <TableCell>{item.rec_seat.event_seat.event_name}</TableCell>
                                <TableCell>{item.rec_seat.seat_name}</TableCell>
                                <TableCell>{item.rec_seat.seat_price * item.rec_quantity}</TableCell>
                                {/* <TableCell>{item.rec_status}</TableCell> */}
                                <TableCell>
                                    <div className="flex justify-center gap-2 w-full">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon onClick={() => acceptOrder(item.rec_id)} />
                                        </span>
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon onClick={() => rejectOrder(item.rec_id)} />
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>

    )
};
