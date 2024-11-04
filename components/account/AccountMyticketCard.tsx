"use client";

import { Address } from "@/types/data_type";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Prisma, Receipt } from "@prisma/client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

type ReceiptWithDetails = Prisma.ReceiptGetPayload<{
    include: {
        rec_seat: {
            include: {
                event_seat: {
                    include: {
                        event_type: true;
                    };
                };
            };
        };
    };
}>;

export default function AccountMyticketCard() {
    const [receipts, setReceipts] = useState<ReceiptWithDetails[]>([]);
    const { data: session, status } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',    // Use 'numeric' instead of a plain string
        month: 'long',      // You can choose 'long', 'short', or 'narrow'
        day: 'numeric',     // Use 'numeric' for day
        weekday: 'long',    // Use 'long', 'short', or 'narrow'
        hour: 'numeric',    // Use 'numeric' for hour
        minute: 'numeric',  // Use 'numeric' for minute
        hour12: true        // This can remain as a boolean
    };

    const options2: Intl.DateTimeFormatOptions = {
        year: 'numeric',    // 'numeric' or '2-digit'
        month: 'long',      // 'long', 'short', 'narrow', or 'numeric'
        day: 'numeric',     // 'numeric' or '2-digit'
        hour: 'numeric',    // 'numeric' or '2-digit'
        minute: 'numeric',  // 'numeric' or '2-digit'
        hour12: true,       // boolean
        timeZone: 'Asia/Bangkok' // or any valid timezone string
    };

    const [ticketinfo, setticketinfo] = useState<number>(0);

    const handleLinkClick = (receiptIndex: number) => {
        
        setticketinfo(receiptIndex);
        onOpen();
    };

    const removeRecepit1 = (event: any, receipt: any) => {
        event.stopPropagation();
        
        removeReceipt(receipt);
    };

    const [processingReceipts, setProcessingReceipts] = useState(new Set());

    const removeReceipt = async (receipt: any) => {
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to process this refund? This action cannot be undone.");
        if (!confirmed) return; // Exit if user cancels

        // Add the receipt ID to the processing state
        const newProcessingReceipts = new Set(processingReceipts);
        newProcessingReceipts.add(receipt.rec_id);
        setProcessingReceipts(newProcessingReceipts);

        try {
            const response = await fetch(`/api/refund`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(receipt),
            });

            if (response.ok) {
                

                // Remove the receipt from the UI
                setReceipts(receipts.filter(r => r.rec_id !== receipt.rec_id));
            } else {
                console.error('Failed to process refund.');
            }
        } catch (error) {
            console.error('Error processing refund:', error);
        } finally {
            // Remove the receipt from processing state
            newProcessingReceipts.delete(receipt.rec_id);
            setProcessingReceipts(newProcessingReceipts);
        }

    };

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await fetch(`/api/getReceipt?customerid=${session?.user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    
                    setReceipts(data);
                } else {
                    console.error('Failed to fetch receipts');
                }
            } catch (error) {
                console.error('Error fetching receipts:', error);
            }
        };
        if (status == "authenticated") {
            fetchReceipts();
        }
    }, [status])
    // แบ่งข้อมูลเป็น upcoming และ past events
    const now = new Date();
    const upcomingEvents = receipts.filter(receipt =>
        new Date(receipt.rec_seat.event_seat.event_last_date) > now && // Check if the event is upcoming
        receipt.rec_status === 0 // Check if rec_status is 0
    );
    const pastEvents = receipts.filter(receipt => new Date(receipt.rec_seat.event_seat.event_last_date) <= now);

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return (
        <div>
            <Tabs>
                <Tab key="upcomming" title="UPCOMMING EVENTS">
                    <Accordion variant="splitted">
                        {upcomingEvents.map((receipt, index) => {
                            const address: Address = JSON.parse(receipt.rec_seat.event_seat.event_location);
                            return (
                            <AccordionItem key={index} aria-label="Accordion 1" startContent={
                                <div className="grid sm:grid-cols-1 lg:grid-cols-2">
                                    <Image className="object-cover w-full h-24" src={receipt.rec_seat.event_seat.event_images} alt="" />
                                    <div className="w-full text-left">
                                        <h1>{receipt.rec_seat.event_seat.event_name}</h1>
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">ประเภทบัตร/Zone :</h5>
                                            <p>{receipt.rec_seat.seat_name}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">จำนวน :</h5>
                                            <p>{receipt.rec_quantity} ใบ</p>
                                        </div>


                                    </div>
                                </div>
                            }>
                                <div>
                                    <p>{new Date(receipt.rec_seat.event_seat.event_start_date).toDateString()} - {new Date(receipt.rec_seat.event_seat.event_start_date).toDateString()}</p>

                                        
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">สถานที่จัดงาน :</h5>
                                            <span className="">{address.address} {address.city}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">หมวดหมู่ :</h5>
                                            <p>{receipt.rec_seat.event_seat.event_type.et_name}</p>
                                        </div>
                                        <div className="text-center">
                                            <QRCode className="mx-auto w-52" value={`https://tickee-omega.vercel.app/checkReceipt/${receipt.rec_id}`}></QRCode>
                                            <small>ID: {receipt.rec_id}</small>
                                        </div>
                                        
                                    </div>
                                <Button onClick={(e)=>removeRecepit1(e, receipt)} className="float-end mb-5" color="danger">ขอคืนเงิน</Button>
                            </AccordionItem>
                        )})}
                    </Accordion>
                </Tab>
                <Tab key="past" title="PAST EVENTS">
                    <Accordion variant="splitted">
                        {pastEvents.map((receipt, index) => (
                            <AccordionItem key={index} aria-label="Accordion 1" startContent={
                                <div className="grid sm:grid-cols-1 lg:grid-cols-2">
                                    <Image className="object-cover w-full h-24" src={receipt.rec_seat.event_seat.event_images} alt="" />
                                    <div className="w-full text-left">
                                        <h1>{receipt.rec_seat.event_seat.event_name}</h1>
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">ประเภทบัตร/Zone :</h5>
                                            <p>{receipt.rec_seat.seat_name}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <h5 className="text-primary-500 font-bold mr-3">จำนวน :</h5>
                                            <p>{receipt.rec_quantity} ใบ</p>
                                        </div>


                                    </div>
                                </div>
                            }>
                                <div>
                                    <p>{new Date(receipt.rec_seat.event_seat.event_start_date).toDateString()} - {new Date(receipt.rec_seat.event_seat.event_start_date).toDateString()}</p>

                                    <h5 className="text-primary-500 font-bold mr-3">สถานที่จัดงาน :</h5>
                                    <div className="flex flex-row">
                                        {/* <p className="">{JSON.parse(receipt.seatType.event_seat.event_location).address}</p> */}
                                        {/* <p className="">{JSON.parse(receipt.seatType.event_seat.event_location).city}</p> */}
                                    </div>
                                    <div className="flex flex-row">
                                        <h5 className="text-primary-500 font-bold mr-3">หมวดหมู่ :</h5>
                                        <p>{receipt.rec_seat.event_seat.event_type.et_name}</p>
                                    </div>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Tab>
            </Tabs>
        </div>
    );
}
