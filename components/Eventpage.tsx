"use client"
import React, { useEffect, useState } from 'react';

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
import { IconPencil } from './icons';
import { useSession } from 'next-auth/react';
import { Skeleton, Spinner } from '@nextui-org/react';

export default function Eventpage({ eventDetails }: { eventDetails: EventLandingData }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentTab, setCurrentTab] = useState(0);
    const router = useRouter();
    const [showTicketInfo, setShowTicketInfo] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const [seatPerOrder, setSeatPerOrder] = useState<number>(0);
    const [serviceFee, setServiceFee] = useState<number>(0);

    const handlePaymentClick = (input: number) => {

        if (currentTab == 0) {
            setShowAlert(true);
        }
        else {
            onOpen();
            setShowTicketInfo(true);
            setSeatPerOrder(input)
        }
    };
    const handleTabChange = () => {
        setShowTicketInfo(false); // Hide ticket info when selecting a different seat
    };

    const [seatData, setSeatData] = useState<Seat_Type | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleBookingClick = (quantity: number, seatData: Seat_Type | null) => {
        setQuantity(quantity);
        setSeatData(seatData)
        setShowPaymentPage(true); // Show PaymentPage
    };

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('/api/webConfigData');
                if (!response.ok) {
                    throw new Error('Failed to fetch fee');
                }
                const data = await response.json();
                setServiceFee(data.fee);
            }
            catch (error) {
                console.error('Error fetching fee:', error);
            }
        }
        fecthData();
    }, []);

    useEffect(() => {
        if (status == "loading") {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [status])

    if (showPaymentPage) {
        return <Payment quantity={quantity} seatData={seatData} eventname={eventDetails.event_name} serviceFee={serviceFee} />;
    }

    const isSeatAvailable = (seat: Seat_Type) => {
        const currentDate = new Date().getTime();
        const seatCreateDate = new Date(seat.seat_create_date).getTime();
        const seatLastDate = new Date(seat.seat_due_date).getTime();
        return ((currentDate >= seatCreateDate) && (currentDate <= seatLastDate));
    };

    return (
        <div className="space-y-5">
            <Button onClick={() => router.back()} isIconOnly><IconArrowBackOutline /></Button>

            {status == "authenticated" && session.user.role == "organizer" && session.user.id == eventDetails.producer_id && (
                <Card className="grid grid-cols-1 lg:grid-cols-2">
                    <CardBody className="flex flex-col justify-between gap-5">
                        <div className="flex flex-row gap-2">
                            <Button onClick={() => router.push(`/editevent/${eventDetails.event_id}`)} startContent={<IconPencil />}>Event information</Button>
                            <Button onClick={() => router.push(`/promotion_show`)} startContent={<IconPencil />}>Promotion</Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            <Card className="grid grid-cols-1 lg:grid-cols-2">
                <CardHeader className="w-full flex justify-center items-start">
                    <Image className="object-cover min-w-96" width={"400px"} src={eventDetails.event_images} />
                </CardHeader>
                <CardBody className="flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                        <h1 className="text-xl font-bold">{eventDetails.event_name}</h1>
                        <div className="flex flex-row">
                            <Chip size="sm" color='primary'>{eventDetails.event_type.et_name}</Chip>
                        </div>
                        <div className="flex flex-row justify-around items-center uppercase font-bold">
                            <Button color="warning" radius="lg" variant="flat" className="h-4/5">
                                {new Date(eventDetails.event_start_date).getDate() + "-"}
                                {new Date(eventDetails.event_start_date).getMonth() + "-"}
                                {new Date(eventDetails.event_start_date).getFullYear()}
                            </Button>
                            <p className="text-center text-xl"> - </p>
                            <Button color="warning" radius="lg" className="h-4/5">
                                {new Date(eventDetails.event_last_date).getDate() + "-"}
                                {new Date(eventDetails.event_last_date).getMonth() + "-"}
                                {new Date(eventDetails.event_last_date).getFullYear()}
                            </Button>
                        </div>
                        <div className='p-2' dangerouslySetInnerHTML={{ __html: eventDetails.event_intro }} />
                    </div>
                    <Skeleton className="rounded-xl" isLoaded={!loading}>
                        {session?.user.role == "organizer" ?
                            <div className="space-y-2">
                                {eventDetails.Seat_Type.map((seat) => (
                                    <Card key={seat.seat_id} className="w-full cursor-pointer ring-2 ring-foreground-300" >
                                        <CardHeader className='flex flex-col items-start'  >

                                            {(seat.Seat_Dispatch?.sd_max || 0) - (seat.Seat_Dispatch?.sd_current || 0) <= 0 ? (
                                                <p className="text-red-500">{seat.seat_name} Sold Out</p>
                                            ) : <h4 className="font-bold">
                                                {seat.seat_name} เหลือที่นั่ง {(seat.Seat_Dispatch?.sd_max || 0) - (seat.Seat_Dispatch?.sd_current || 0)} ({seat.Seat_Dispatch?.sd_current}/{seat.Seat_Dispatch?.sd_max})
                                            </h4>}

                                            <div className='flex flex-col'>
                                                {seat.Promotion?.pro_type?.pt_id === 2 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
                                                    <>
                                                        <h4 className="font-bold ml-2 text-warning-500">
                                                            โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} %
                                                        </h4>

                                                    </>
                                                ) : seat.Promotion?.pro_type?.pt_id === 3 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
                                                    <>
                                                        <h4 className="font-bold ml-2 text-blue-900">
                                                            โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} บาท
                                                        </h4>
                                                    </>
                                                ) : seat.Promotion?.pro_type?.pt_id === 1 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
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
                            </div> :
                            <div>
                                <h2 className="uppercase font-bold">Select Ticket</h2>
                                <Selector setCurrentTab={setCurrentTab} currentTab={currentTab} onTabChange={handleTabChange} >
                                    {eventDetails.Seat_Type.filter((seat: Seat_Type) => isSeatAvailable(seat)).map((seat) => (
                                        <Card key={seat.seat_id} className="w-full cursor-pointer ring-2 ring-foreground-300" >
                                            <CardHeader className='flex flex-col items-start'  >

                                                {(seat.Seat_Dispatch?.sd_max || 0) - (seat.Seat_Dispatch?.sd_current || 0) <= 0 ? (
                                                    <p className="text-red-500">{seat.seat_name} Sold Out</p>
                                                ) : <h4 className="font-bold">
                                                    {seat.seat_name} เหลือที่นั่ง {(seat.Seat_Dispatch?.sd_max || 0) - (seat.Seat_Dispatch?.sd_current || 0)} ({seat.Seat_Dispatch?.sd_current}/{seat.Seat_Dispatch?.sd_max})
                                                </h4>}

                                                <div className='flex flex-col'>
                                                    {seat.Promotion?.pro_type?.pt_id === 2 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
                                                        <>
                                                            <h4 className="font-bold ml-2 text-warning-500">
                                                                โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} %
                                                            </h4>

                                                        </>
                                                    ) : seat.Promotion?.pro_type?.pt_id === 3 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
                                                        <>
                                                            <h4 className="font-bold ml-2 text-blue-900">
                                                                โปรโมชั่น {seat.Promotion.pro_type.pt_name}  ลด {seat.Promotion.pro_discount} บาท
                                                            </h4>
                                                        </>
                                                    ) : seat.Promotion?.pro_type?.pt_id === 1 && (new Date().getTime() >= new Date(seat.Promotion.pro_start_date).getTime() && new Date().getTime() <= new Date(seat.Promotion.pro_last_date).getTime()) ? (
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

                                {session?.user.role == "user" && <Button radius="full" color="primary" size="lg" className="w-full" onClick={() => handlePaymentClick(eventDetails.event_seat_per_order)} >Buy</Button>}
                            </div>
                        }
                    </Skeleton>
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
                            <TicketInformation currentTab={currentTab} onBookingClick={handleBookingClick} seatPerOrder={seatPerOrder} />
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