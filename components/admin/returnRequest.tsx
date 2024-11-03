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
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { DeleteIcon, EditIcon } from "../icons";
import { ReceiptStatus } from "@/types/data_type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Pagination } from "@nextui-org/pagination";

interface Seat extends Seat_Type {
    event_seat: Event,
    Seat_Dispatch: Seat_Dispatch
}

interface ReturnOrder extends Receipt {
    rec_customer: User,
    rec_seat: Seat
}


export default function ReturnRequest() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen2, setOpen2] = useState<boolean>(false);
    const [orderID, setOrderID] = useState<number>(0);
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [recOnPage, setRecOnPage] = useState<any[] | null>([]);
    const [allREC, setAllREC] = useState<any[] | null>([]);
    const [refresh, setReFresh] = useState<boolean>(true);
    const rowsPerPage = 40;

    useEffect(() => {
        const fetchData = async () => {
            setOnLoad(true)
            try {
                setAllREC(null)
                const res = await fetch('/api/admin/returning');
                if (!res.ok) {
                    const errorResponse = await res.json();
                    
                    throw Error
                }
                const output = await res.json();
                setAllREC(output)
            } catch (error) {
                console.error('Error GET user:', error);
            }
        };
        fetchData();
    }, [refresh]);

    const changePage = (input: number) => {
        if (allREC != null) {
            const start = (input - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            setLastPage(Math.ceil(allREC.length / rowsPerPage));
            setPage(input)
            setRecOnPage(allREC.slice(start, end))
        }
    }

    if (allREC && onLoad) {
        changePage(1)
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
        setReFresh(!refresh)
        onClose()
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
        setReFresh(!refresh)
        onClose2()
    };

    return (
        <>
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

            {!onLoad && recOnPage != null && (
                <Table 
                className="p-8" 
                selectionMode="single" 
                color="default"
                aria-label="Table"
                bottomContent={
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
                } 
                >
                    <TableHeader>
                        <TableColumn align="center">USER</TableColumn>
                        <TableColumn align="center">EMAIL</TableColumn>
                        <TableColumn align="center">EVENT</TableColumn>
                        <TableColumn align="center">SEAT / ZONE</TableColumn>
                        <TableColumn align="center">TOTAL PRICE</TableColumn>
                        <TableColumn align="center">STATUS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No Data for Display."}>
                        {recOnPage.map((item: ReturnOrder) => (
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
