"use client"
import React, { useRef, useState } from 'react';

import Selector from "@/components/selector";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import TicketInformation from "../app/event/[eventId]/TicketInformation";

import 'swiper/css';
import 'swiper/css/pagination';
import { Event } from '@prisma/client';


export default function Eventpage({ items }: { items: Event }) {
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const [showTicketInfo, setShowTicketInfo] = useState(false);

    console.log(items)
    const handlePaymentClick = () => {
        setShowTicketInfo(true); // Show the ticket information
    };
    return (
        <div className="space-y-5">
            <Button onClick={() => router.back()}>Back</Button>
            <Card className="grid grid-cols-1 lg:grid-cols-2">
                <CardHeader className="w-full flex justify-center items-center">
                    <Image className="" width={"100%"} src={items.event_images?.name} />
                </CardHeader>
                <CardBody className="flex flex-col justify-between">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold">{items.event_name}</h1>
                        <div className="flex flex-row">
                            <Chip size="sm" className="">{items.event_type_id}</Chip>
                        </div>
                        <p>{items.event_description.slice(0, 1003)}</p>
                    </div>

                    <div>
                        <h2 className="uppercase font-bold">Select Ticket</h2>
                        <Selector setCurrentTab={setCurrentTab} currentTab={currentTab}>
                            <Card className="w-full">
                                <CardHeader>
                                    <h4 className="font-bold">Seat 1 Seat 1 Seat 1 Seat 1</h4>
                                </CardHeader>
                                <CardBody className="flex flex-row justify-between items-center">
                                    <div>
                                        <p>฿ 1500</p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="w-full">
                                <CardHeader>
                                    <h4 className="font-bold">Seat 1 Seat 1 Seat 1 Seat 1</h4>
                                </CardHeader>
                                <CardBody className="flex flex-row justify-between items-center">
                                    <div>
                                        <p>฿ 1500</p>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className="w-full">
                                <CardHeader>
                                    <h4 className="font-bold">Seat 1 Seat 1 Seat 1 Seat 1</h4>
                                </CardHeader>
                                <CardBody className="flex flex-row justify-between items-center">
                                    <div>
                                        <p>฿ 1500</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Selector>
                        <Button color="primary" size="lg" className="w-full" onClick={handlePaymentClick} >Payment</Button>

                        
                    </div>
                    
                </CardBody>
            </Card>
            

                    <div className="mt-8">
                            {showTicketInfo && (
                                <TicketInformation />
                            )}
                        </div>
            <Card className="leading-10">
               {items.event_description}
               <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_06092024_PosterSoldOut_CW.jpg"} />
                <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_16082024_Info_Lineup.jpg"} />
            </Card>

</div>
    )
}