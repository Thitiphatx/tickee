"use client"
import React, { useState } from 'react';

import Selector from "@/components/selector";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import TicketInformation from "../app/event/[eventId]/TicketInformation";

import Payment from './payment/paymentpage';

import 'swiper/css';
import 'swiper/css/pagination';
import { EventLandingData } from '@/types/data_type';
import { IconArrowBackOutline } from '@/styles/icon';
import { Seat_Type } from '@prisma/client';
import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal';

export default function Eventpage({ eventDetails }: { eventDetails: EventLandingData }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const [showTicketInfo, setShowTicketInfo] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const handlePaymentClick = () => {
        if (currentTab == 0) {
            setShowAlert(true);
        }
        else {
            console.log("Buying ticket for tab:", currentTab);
            onOpen();
            setShowTicketInfo(true);
        }
    };
    const handleTabChange = () => {
        setShowTicketInfo(false); // Hide ticket info when selecting a different seat
    };

    const [seatData, setSeatData] = useState<Seat_Type | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleBookingClick = (quantity: number, seatData: Seat_Type | null) => {
        console.log("จำนวนซื้อทั้งหมด :", quantity)
        setQuantity(quantity);
        setSeatData(seatData)
        console.log("ข้อมูลที่นั่ง:", seatData);
        setShowPaymentPage(true); // Show PaymentPage
    };

    if (showPaymentPage) {
        return <Payment quantity={quantity} seatData={seatData} eventname={eventDetails.event_name} />;
    }
    return (
        <div className="space-y-5">
            <Button onClick={() => router.back()} isIconOnly><IconArrowBackOutline /></Button>

            <Card className="grid grid-cols-1 lg:grid-cols-2">
                <CardHeader className="w-full flex justify-center items-start">
                    <Image className="object-cover min-w-96" width={"400px"} src={eventDetails.event_images} />
                </CardHeader>
                <CardBody className="flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold">{eventDetails.event_name}</h1>
                        <div className="flex flex-row">
                            <Chip size="sm" className="">{eventDetails.event_type.et_name}</Chip>
                        </div>
                        <div className='p-2' dangerouslySetInnerHTML={{ __html: eventDetails.event_intro }} />
                    </div>
                    <div>
                        <h2 className="uppercase font-bold">Select Ticket</h2>
                        <Selector setCurrentTab={setCurrentTab} currentTab={currentTab} onTabChange={handleTabChange} >
                            {eventDetails.Seat_Type.map((seat) => (
                                <Card key={seat.seat_id} className="w-full cursor-pointer ring-2 ring-foreground-300" seatId={seat.seat_id} >
                                    <CardHeader className='flex flex-col items-start' >
                                        <h4 className="font-bold">{seat.seat_name} เหลือที่นั่ง ({seat.Seat_Dispatch?.sd_max}/{seat.Seat_Dispatch?.sd_current})</h4>

                                        <div className='flex flex-col'>
                                            {seat.Promotion?.pro_type?.pt_id === 1 ? (
                                                <>
                                                    <h4 className="font-bold ml-2 text-warning-500">
                                                        โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} %
                                                    </h4>

                                                </>
                                            ) : seat.Promotion?.pro_type?.pt_id === 2 ? (
                                                <>
                                                    <h4 className="font-bold ml-2 text-blue-900">
                                                        โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} บาท
                                                    </h4>
                                                </>
                                            ) : seat.Promotion?.pro_type?.pt_id === 3 ? (
                                                <>
                                                    <h4 className="font-bold ml-2 text-red-900">
                                                        โปรโมชั่น {seat.Promotion?.pro_type.pt_name}  แจก {seat.Promotion?.pro_description}
                                                    </h4>

                                                </>
                                            ) : null}
                                        </div>

                                    </CardHeader>
                                    <CardBody className="flex flex-row justify-between items-center">
                                        <div>

                                            <p>฿ {seat.seat_price}</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}

                        </Selector>

                        <Button radius="full" color="primary" size="lg" className="w-full" onClick={handlePaymentClick} >Buy</Button>
                    </div>
                    {showAlert && (
                            <Card role="alert" isPressable onPress={() => setShowAlert(false)} className="ring-1 ring-warning-500 w-full">
                                <CardBody>
                                    <div className="text-center">
                                        <span className="font-medium">โปรดเลือกที่นั่งก่อนทำการซื้อ !</span> กรุณาเลือก zone ที่นั่งก่อน
                                    </div>
                                </CardBody>
                            </Card>
                    )}
                </CardBody>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <TicketInformation currentTab={currentTab} onBookingClick={handleBookingClick} />
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Card className="leading-10">
                <div className='p-4' dangerouslySetInnerHTML={{ __html: eventDetails.event_description }} />
            </Card>

        </div>
    )
}