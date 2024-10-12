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

export default function Eventpage({ eventDetails }: { eventDetails: EventLandingData }) {
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
            setShowTicketInfo(true);
        }
    };
    const handleTabChange = () => {
        setShowTicketInfo(false); // Hide ticket info when selecting a different seat
    };

    const [seatData, setSeatData] = useState<Seat_Type | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleBookingClick = (quantity: number,seatData: Seat_Type | null) => {
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
                <CardHeader className="w-full flex justify-center items-center">
                    <Image className="relative" width={"100%"} src={eventDetails.event_images} />
                </CardHeader>
                <CardBody className="flex flex-col justify-between">
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
                                <Card key={seat.seat_id} className="w-full cursor-pointer" seatId={seat.seat_id} >
                                    <CardHeader>
                                        {/* <h4>{seat.seat_id}</h4> */}
                                        <h4 className="font-bold">{seat.seat_name} เหลือที่นั่ง ({seat.Seat_Dispatch?.sd_max}/{seat.Seat_Dispatch?.sd_current})</h4>
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
                        {showAlert && (
                                <div className="flex p-4 mb-4 mt-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        <span className="font-medium">โปรดเลือกที่นั่งก่อนทำการซื้อ!</span> กรุณาเลือก zone ที่นั่งก่อน
                                    </div>
                                    <button onClick={() => setShowAlert(false)} className="ml-auto text-yellow-700 hover:underline ">
                                    ปิด
                                    </button>
                                </div>
                            )}
                    </div>
                </CardBody>
            </Card>


            <div className="mt-8">
                {showTicketInfo && (
                    <TicketInformation currentTab={currentTab} onBookingClick={handleBookingClick}  />
                )}
            </div>
            <Card className="leading-10">
                <div className='p-4' dangerouslySetInnerHTML={{ __html: eventDetails.event_description }} />
            </Card>

        </div>
    )
}