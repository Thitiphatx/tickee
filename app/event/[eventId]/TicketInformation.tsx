import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Seat_Type } from '@/types/data_type';
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";

// สร้าง PaymentPage component


export default function TicketInformation({ currentTab, onBookingClick, seatPerOrder }: { currentTab: number, onBookingClick: (quantity: number, seatData: Seat_Type | null) => void , seatPerOrder :  number }) {
    console.log("แสดงข้อมูลที่นั่ง seat id: ", currentTab)

    const [seatData, setSeatData] = useState<Seat_Type | null>(null);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long', // 'short' สำหรับเดือนแบบย่อ
        day: 'numeric',
        weekday: 'long', // Optional: to include the weekday in Thai
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // Set to false for 24-hour format
    };

    // Format the date only when seatData is available
    const formattedstartDate = seatData?.seat_create_date ? new Date(seatData.seat_create_date).toLocaleString('th-TH', options).replace(',', '')
        : 'ไม่พบข้อมูลวันที่'; // Fallback if date is not available

    const formattedendDate = seatData?.seat_create_date ? new Date(seatData.seat_due_date).toLocaleString('th-TH', options).replace(',', '')
        : 'ไม่พบข้อมูลวันที่'; // Fallback if date is not available


    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                const response = await fetch(`/api/getseatData?seatId=${currentTab}`);
                const data = await response.json();

                if (data.success) {
                    console.log("dataที่มาจากการเลือก seat: ", data.data)
                    setSeatData(data.data)
                } else {
                    console.log("Failed to fetch seat data");
                }
            } catch (err) {
                console.log("Error fetching seat data");
            }
        };

        if (currentTab) {
            fetchSeatData();
        }
    }, [currentTab]);


    const [quantity, setQuantity] = useState(1);
    const unitPrice = seatData?.seat_price;

    const increaseQuantity = () => {
        if (seatData?.Seat_Dispatch?.sd_max !== undefined && quantity < seatData.Seat_Dispatch.sd_max && quantity < seatPerOrder) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }

    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Ticket Information</ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">วันเริ่มงาน</h5>
                        <small>{formattedstartDate}</small>
                    </div>
                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">วันจบงาน</h5>
                        <small>{formattedendDate}</small>
                    </div>
                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">โซน</h5>
                        <small>{seatData?.seat_name}</small>
                    </div>
                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">Quantity</h5>
                        <small>
                            <div className="flex items-center space-x-4">
                                <Button size="sm" onClick={decreaseQuantity} isIconOnly>
                                    -
                                </Button>
                                <small>{quantity}</small>
                                <Button size="sm" onClick={increaseQuantity} isIconOnly>
                                    +
                                </Button>
                            </div>
                        </small>
                    </div>

                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">ราคาต่อที่</h5>
                        <small>{unitPrice?.toLocaleString()}</small>
                    </div>
                    <div className="grid grid-cols-2">
                        <h5 className="text-primary-800">ราคารวม</h5>
                        <small>{(quantity * (unitPrice ?? 0)).toLocaleString()}</small>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button>Back</Button>
                <Button color="primary" onClick={() => onBookingClick(quantity, seatData)} >Booking</Button>
            </ModalFooter>
        </>

    );
}
