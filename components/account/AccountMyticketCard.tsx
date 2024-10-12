"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Tab, Tabs } from "@nextui-org/tabs"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AccountMyticketCard() {
    const [receipts, setReceipts] = useState([]);
    const { data: session, status } = useSession();
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketinfo, setticketinfo] = useState();
    const handleLinkClick = (event,receipt) => {
        event.preventDefault(); // ป้องกันการคลิก link
        console.log(receipt);
        setticketinfo(receipt);
        setIsModalOpen(true); // เปิด modal
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // ปิด modal
    };

    const removeRecepit = (event) => {
        event.stopPropagation();
        console.log("ขอเงินคืน")

    };

    useEffect(() => {
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

        fetchReceipts();
    }, []);

    // แบ่งข้อมูลเป็น upcoming และ past events
    const now = new Date();
    const upcomingEvents = receipts.filter(receipt => new Date(receipt.seatType.event_seat.event_last_date) > now);
    const pastEvents = receipts.filter(receipt => new Date(receipt.seatType.event_seat.event_last_date) <= now);

    return (
        <div>
            <Tabs>
                <Tab key="upcomming" title="UPCOMMING EVENTS">
                    <Card>
                        <CardHeader>
                            <h2 className="font-bold uppercase">upcomming events</h2>
                        </CardHeader>
                        <CardBody className="p-6">
                            {upcomingEvents.map((receipt) => (
                                <a href="#" onClick={(e) => handleLinkClick(e, receipt)} className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={receipt.seatType.event_seat.event_images} alt="" />
                                    <div className="flex flex-col p-4 leading-normal">
                                        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">{receipt.seatType.event_seat.event_name}</h5>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">ประเภทบัตร/Zone</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.seatType.seat_name}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">จำนวนตั๋วหรือบัตรที่มี / Tickets available</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_quantity}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">สถานที่จัดงาน / location</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).address}</p>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).city}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันเริ่มงาน / event start date</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.seatType.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                        </div>
                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันจบงาน / event end date</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.seatType.event_seat.event_last_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                        </div>
                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">หมวดหมู่ / category</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_type.et_name}</p>
                                        </div>
                                        <div className="flex-row flex">
                                            {
                                                (() => {
                                                    const now = new Date();
                                                    const eventStartDate = new Date(receipt.seatType.event_seat.event_start_date);
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
                        <CardBody className="p-6">
                            {pastEvents.map((receipt) => (
                                <a href="#" className="w-full flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={receipt.seatType.event_seat.event_images} alt="" />
                                    <div className="flex flex-col p-4 leading-normal">
                                        <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">{receipt.seatType.event_seat.event_name}</h5>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">ประเภทบัตร/Zone</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.seatType.seat_name}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">จำนวนตั๋วหรือบัตรที่มี / Tickets available</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_quantity}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">สถานที่จัดงาน / location</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).address}</p>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{JSON.parse(receipt.seatType.event_seat.event_location).city}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันเริ่มงาน / event start date</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.seatType.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                        </div>
                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">วันจบงาน / event end date</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{new Date(receipt.seatType.event_seat.event_last_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                        </div>

                                        <div className="flex-row flex">
                                            <h5 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white">หมวดหมู่ / category</h5>
                                            <p className="mb-3 ml-4 font-normal text-gray-500 dark:text-gray-200">{receipt.rec_type.et_name}</p>
                                        </div>


                                    </div>
                                </a>
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>

            {isModalOpen && (
                <div id="default-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="w-1/2 relative bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold">ตั๋วของคุณ</h3>
                            
                            <button onClick={handleCloseModal} className="text-gray-400 hover:bg-gray-200 rounded-lg p-1">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 ">
                            <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-semibold text-center mb-4">Your Event Ticket</h2>
                                <h5 className="text-sm font-semibold">วันเวลาออกตั๋ว {new Date(ticketinfo?.rec_date).toLocaleString('th-TH', options2).replace(' ', ' ')} น.</h5>
                                <div className="border rounded-lg p-4 mb-4 mt-2">
                                    <h3 className="text-smg font-bold">{ticketinfo?.seatType.event_seat.event_name}</h3>
                                    <p className="text-gray-600">{ticketinfo?.seatType.seat_name}</p>
                                    
                                </div>

                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h4 className="text-md font-semibold">Date & Time</h4>
                                        <p className="text-gray-600">{new Date(ticketinfo?.seatType.event_seat.event_start_date).toLocaleString('th-TH', options).replace(',', '')}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold">Location</h4>
                                        <p className="text-gray-600">{JSON.parse(ticketinfo?.seatType.event_seat.event_location).address}</p>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4 mb-4 text-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="mx-auto h-32 w-32 mb-2" />
                                    <p className="text-sm text-gray-600">Scan this code at the entry</p>
                                </div>

                                <button className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">Download Ticket</button>
                            </div>


                        </div>

                        


                        <div className="flex justify-end p-4 border-t">
                            <button onClick={handleCloseModal} className="bg-blue-600 text-white rounded-lg px-4 py-2">Close</button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
