"use client"
import Selector from "@/components/selector";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TicketInformation from "./TicketInformation";
import { Link } from "@nextui-org/link";

export default function EventLanding() {
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const [showTicketInfo, setShowTicketInfo] = useState(false);

    const handlePaymentClick = () => {
        setShowTicketInfo(true); // Show the ticket information
    };
    return (
        <div className="space-y-5">
            <Link className="cursor-pointer" color="foreground" isBlock onClick={() => router.back()}>Back</Link>
            <Card className="grid grid-cols-1 lg:grid-cols-2">
                <CardHeader className="w-full flex justify-center items-center">
                    <Image className="" width={"100%"} src="https://res.theconcert.com/w_600,h_800,c_thumb/8b3805c8dd6a7d58d099fd855a5d0ae82/mmf2024_banner_poster_450x600px.jpg" />
                </CardHeader>
                <CardBody className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">event title event title event title event title</h1>
                        <div className="flex flex-row">
                            <Chip size="sm" className="">concert</Chip>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_06092024_PosterSoldOut_CW.jpg"} />
                <Image src={"https://atkmedia.allticket.com/images/up/21174/BMMF14_16082024_Info_Lineup.jpg"} />
            </Card>
        </div>
    )
}
