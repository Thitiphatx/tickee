"use client"
import React, {  useState } from 'react';

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

export default function Eventpage({ eventDetails }: { eventDetails: EventLandingData }) {
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const [showTicketInfo, setShowTicketInfo] = useState(false);
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const handlePaymentClick = () => {
        setShowTicketInfo(true);
    };

    const handleBookingClick = (price: number) => {
        console.log("ราคา :",price)
        setTotalPrice(price);
        
        setShowPaymentPage(true); // Show PaymentPage
      };

    if (showPaymentPage) {
        return <Payment totalPrice={totalPrice}  />;
    }  
    return (
        <div className="space-y-5">
            <Button onClick={() => router.back()}>Back</Button>
            <Card className="grid grid-cols-1 lg:grid-cols-2">
                <CardHeader className="w-full flex justify-center items-center">
                    <Image className="" width={"100%"} src={eventDetails.event_images} />
                </CardHeader>
                <CardBody className="flex flex-col justify-between">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold">{eventDetails.event_name}</h1>
                        <div className="flex flex-row">
                            <Chip size="sm" className="">{eventDetails.event_type.et_name}</Chip>
                        </div>
                        <p>{""}</p>
                    </div>

                    <div>
                        {eventDetails.Seat_Type[0].Seat_Dispatch?.sd_max}
                        <h2 className="uppercase font-bold">Select Ticket</h2>
                        <Selector setCurrentTab={setCurrentTab} currentTab={currentTab}>
                            {eventDetails.Seat_Type.map((seat)=> (
                                <Card key={seat.seat_id} className="w-full">
                                    <CardHeader>
                                        <h4 className="font-bold">{seat.seat_name}</h4>
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
                    
                </CardBody>
            </Card>
            

                    <div className="mt-8">
                            {showTicketInfo && (
                                <TicketInformation onBookingClick={handleBookingClick} />
                            )}
                        </div>
            <Card className="leading-10">
               {eventDetails.event_description}
               <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_06092024_PosterSoldOut_CW.jpg"} />
                <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_16082024_Info_Lineup.jpg"} />
            </Card>

</div>
    )
}