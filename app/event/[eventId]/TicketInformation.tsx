import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Seat_Type } from '@/types/data_type';

// สร้าง PaymentPage component


export default function TicketInformation({ currentTab, onBookingClick }: { currentTab: number, onBookingClick: (totalPrice: number) => void }) {
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
        console.log("currentTab changed to:", currentTab);
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

        if (seatData?.Seat_Dispatch?.sd_max !== undefined && quantity < seatData.Seat_Dispatch.sd_max) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }

    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const totalPrice = quantity * (unitPrice ?? 0);

    return (
        <div>

            <Card className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Ticket Information</h2>

                <div className="grid grid-cols-2 gap-y-4 text-lg">


                    <span>วันเริ่มงาน</span>
                    <span className="font-medium">{formattedstartDate}</span>
                    <span>วันจบงาน</span>
                    <span className="font-medium">{formattedendDate}</span>

                    <span>Zone</span>
                    <span className="font-medium">{seatData?.seat_name}</span>
                    
                    <span>Quantity</span>
                    <div className="flex items-center space-x-4">
                        <button
                            className="px-4 py-2 rounded hover:bg-gray-400"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button
                            className="px-4 py-2 rounded hover:bg-gray-400"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>

                    <span>Unit Price (Baht)</span>
                    <span className="font-medium">{unitPrice?.toLocaleString()}</span>

                    <span>Total Price (Baht)</span>
                    <span className="font-medium">
                        {(quantity * (unitPrice ?? 0)).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between mt-8">
                    <Button>Back</Button>
                    {/* คลิก Booking แล้วแสดงหน้า Payment */}
                    <Button color="primary" onClick={() => onBookingClick(totalPrice)} >Booking</Button>
                </div>
            </Card>
        </div>
    );
}
