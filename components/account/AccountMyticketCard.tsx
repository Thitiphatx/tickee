"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Prisma, Receipt } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
        console.log(receipts[receiptIndex].rec_date);
        setticketinfo(receiptIndex);
        onOpen();
    };

    const removeRecepit1 = (event: any, receipt: any) => {
        event.stopPropagation();
        console.log("ขอเงินคืน");
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
                console.log('Refund processed successfully.');

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

    useEffect(()=> {
        const fetchReceipts = async () => {
            try {
                const response = await fetch(`/api/getReceipt?customerid=${session?.user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('ข้อมูลการซื้อของผู้ใช้', data);
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
    const upcomingEvents = receipts.filter(receipt => new Date(receipt.rec_seat.event_seat.event_last_date) > now);
    const pastEvents = receipts.filter(receipt => new Date(receipt.rec_seat.event_seat.event_last_date) <= now);

    return (
        <div>
            <Tabs>
                <Tab key="upcomming" title="UPCOMMING EVENTS">
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold uppercase">upcomming events</h2>
                        </CardHeader>
                        <CardBody className="p-6 space-y-5">
                            {upcomingEvents.map((receipt, index) => (
                                <a key={index} href="#" onClick={(e) => handleLinkClick(index)} className="w-full flex flex-col">
                                    <Card className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                                        <Image className="object-cover w-full" width={"100%"} height={"300px"} src={receipt.rec_seat.event_seat.event_images} alt="" />
                                        <CardBody className="sm:grid-cols-1 md:col-span-2 lg:col-span-3">
                                            <div className="flex flex-col p-4 leading-normal col-span-3">
                                                <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">{receipt.rec_seat.event_seat.event_name}DDD</h5>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">ประเภทบัตร/Zone</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_seat.seat_name}</p>
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">จำนวนตั๋วหรือบัตรที่มี / Tickets available</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_quantity}</p>
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">สถานที่จัดงาน / location</h5>
                                                    {/* <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).address}</p> */}
                                                    {/* <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).city}</p> */}
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันเริ่มงาน / event start date</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.rec_seat.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                                </div>
                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันจบงาน / event end date</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.rec_seat.event_seat.event_last_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                                </div>
                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">หมวดหมู่ / category</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_seat.event_seat.event_type.et_name}</p>
                                                </div>
                                                <div className="flex-row flex">
                                                    {
                                                        (() => {
                                                            const now = new Date();
                                                            const eventStartDate = new Date(receipt.rec_seat.event_seat.event_start_date);
                                                            // const diffInTime = eventStartDate - now; // คำนวณความต่างของเวลา (มิลลิวินาที)
                                                            // const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // แปลงเป็นจำนวนวัน

                                                            return (
                                                                <button onClick={(e)=>removeRecepit1(e, receipt)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                                    ขอคืนเงิน
                                                                </button>
                                                            );
                                                        })()
                                                    }
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </a>
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="past" title="PAST EVENTS">
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold uppercase">past events</h2>
                        </CardHeader>
                        <CardBody className="p-6">
                            {pastEvents.map((receipt) => (
                                <a href="#" className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <Card>
                                    <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={receipt.rec_seat.event_seat.event_images} alt="" />
                                    <CardBody className="flex flex-col p-4 leading-normal">
                                        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">{receipt.rec_seat.event_seat.event_name}</h5>
                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">ประเภทบัตร/Zone</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_seat.seat_name}</p>
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">จำนวนตั๋วหรือบัตรที่มี / Tickets available</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_quantity}</p>
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">สถานที่จัดงาน / location</h5>
                                                    {/* <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).address}</p> */}
                                                    {/* <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).city}</p> */}
                                                </div>

                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันเริ่มงาน / event start date</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.rec_seat.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                                </div>
                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันจบงาน / event end date</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.rec_seat.event_seat.event_last_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                                </div>
                                                <div className="flex-row flex">
                                                    <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">หมวดหมู่ / category</h5>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_seat.event_seat.event_type.et_name}</p>
                                                </div>
                                        </CardBody>
                                    </Card>
                                </a>
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Receipt Details</ModalHeader>
                    <ModalBody>
                        <div>
                            {/* <h3 className="font-bold text-lg">Event Name: {receipts[ticketinfo].rec_seat.event_seat.event_name}</h3> */}
                            {/* <p>Date: {new Date(receipts[ticketinfo].rec_date).toLocaleString('th-TH', options2).replace(',', '')}</p> */}
                            {/* <p>Tickets: {receipts[ticketinfo].rec_quantity}</p> */}
                            {/* <p>Location: {JSON.parse(receipts[ticketinfo].seatType.event_seat.event_location).address}, {JSON.parse(receipts[ticketinfo].seatType.event_seat.event_location).city}</p> */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onOpenChange}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
