"use client"

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Image } from "@nextui-org/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Tab, Tabs } from "@nextui-org/tabs"
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

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };

    const options2 = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Bangkok'
    };
    const [ticketinfo, setticketinfo] = useState<number>(0);

    const handleLinkClick = (receiptIndex: number) => {
        console.log(receipts[receiptIndex].rec_date)
        setticketinfo(receiptIndex);
        onOpen();
    };

    const removeRecepit = (event) => {
        event.stopPropagation();
        console.log("ขอเงินคืน")

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
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.rec_seat.event_seat.event_location).address}</p>
                                                    <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.rec_seat.event_seat.event_location).city}</p>
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
                                                            const diffInTime = eventStartDate - now; // คำนวณความต่างของเวลา (มิลลิวินาที)
                                                            const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // แปลงเป็นจำนวนวัน

                                                            return diffInDays > 30 && (
                                                                <button onClick={removeRecepit} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
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
                            <p className=" ml-4 font-normal text-gray-500 dark:text-gray-200">ตั๋วเหล่านี้หมดอายุแล้ว</p>
                        </CardHeader>
                        <CardBody className="p-6  space-y-5">
                            {pastEvents.map((receipt) => (
                                <a href="#" className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={receipt.rec_seat.event_seat.event_images} alt="" />
                                    <div className="flex flex-col p-4 leading-normal">
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
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.rec_seat.event_seat.event_location).address}</p>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.rec_seat.event_seat.event_location).city}</p>
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
                                    </div>
                                </a>
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ตั๋วของคุณ</ModalHeader>
                            <ModalBody>
                                <h2 className="text-2xl font-semibold text-center mb-4">Your Event Ticket</h2>
                                <h5 className="text-sm font-semibold">วันเวลาออกตั๋ว {new Date(receipts[ticketinfo].rec_date).toLocaleString('th-TH', options2).replace(' ', ' ')} น.</h5>
                                <div className="border rounded-lg p-4 mb-4 mt-2">
                                    <h3 className="text-smg font-bold">{receipts[ticketinfo].rec_seat.event_seat.event_name}</h3>
                                    <p>{receipts[ticketinfo].rec_seat.seat_name}</p>

                                </div>

                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h4 className="text-md font-semibold">Date & Time</h4>
                                        <p>{new Date(receipts[ticketinfo].rec_seat.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold">Location</h4>
                                        <p>{JSON.parse(receipts[ticketinfo].rec_seat.event_seat.event_location).address}</p>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4 mb-4 text-center bg-white">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="mx-auto h-32 w-32 mb-2" />
                                    <p className="text-sm text-foreground-200">Scan this code at the entry</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary">
                                    Download Ticket
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



        </div>
    );
}
