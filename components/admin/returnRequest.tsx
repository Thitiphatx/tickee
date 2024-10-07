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

interface Seat extends Seat_Type {
    event_seat: Event,
    Seat_Dispatch: Seat_Dispatch
}

interface ReturnOrder extends Receipt {
    rec_customer: User,
    rec_seat: Seat
}


export default function ReturnRequest({ data }: { data: any[] }) {
    const [reject, setReject] = useState(false);
    const [accept, setAccept] = useState(false);
    const [orderID, setOrderID] = useState<number>(0);
    // const [outputEmail, setOutputEmail] = useState<string>("");
    // const [outputRole, setOutputRole] = useState<string>("");

    const rejectOrder = (id:number) => {
        setOrderID(id)
        setReject(true);
    };

    const rejectOrderClose = () => {
        setOrderID(0)
        setReject(false);
    };

    const acceptOrder = (id:number) => {
        setOrderID(id)
        setAccept(true);
    };

    const acceptOrderClose = () => {
        setOrderID(0)
        setAccept(false);
    };

    const handleAccept = async (e: React.FormEvent) => {
        e.preventDefault();
        let status: number = ReceiptStatus.ReturnSuccess;
        let id:number = orderID
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
        let id:number = orderID
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
                <form onSubmit={handleAccept}>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={acceptOrderClose}
                    />
                    <Card className="absolute z-20 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Returning</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                                <span className="uppercase font-semibold text-xl">Accept Returning</span>
                                <p className="text-danger text-lg">
                                    <span>Receipt ID </span>
                                    {orderID}
                                    <span> Returning Success?</span>
                                </p>
                            </div>
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                        </CardBody>
                    </Card>
                </form>
            )}

            {reject && (
                <form onSubmit={handleReject}>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={rejectOrderClose}
                    />
                    <Card className="absolute z-20 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Returning</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                                <span className="uppercase font-semibold text-xl">Reject Returning</span>
                                <p className="text-danger text-lg">
                                <span>Receipt ID </span>
                                    {orderID}
                                    <span>Unable to Return?</span>
                                </p>
                            </div>
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                        </CardBody>
                    </Card>
                </form>
            )}
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
        </>

    )
};
