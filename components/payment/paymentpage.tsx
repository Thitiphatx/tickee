import { Card } from "@nextui-org/card";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutpage from "./checkoutpage";
import { Seat_Type } from "@/types/data_type";
import { useState } from "react";
import { notFound } from "next/navigation";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("Public key undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment({ quantity, seatData, eventname, serviceFee }: { quantity: number, seatData: Seat_Type | null, eventname: String, serviceFee: number }) {

    if (seatData == null) {
        return (<>not found</>)
    }
    
    
    const fee = serviceFee * quantity
    const totalPrice = seatData.seat_price * quantity
    let totalPriceplusfee;

    const datepromotion = seatData.Promotion?.pro_last_date
    const startdatepromotion = seatData.Promotion?.pro_start_date
    const today = new Date();
    console.log(datepromotion)
    console.log(today)
    if (datepromotion && startdatepromotion) {
        const promoDate = new Date(datepromotion);
        promoDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);


        if ((new Date().getTime() >= new Date(startdatepromotion).getTime() && new Date().getTime() <= new Date(datepromotion).getTime())) {

            if (seatData.Promotion?.pro_type_id === 2) {

                totalPriceplusfee = (totalPrice - (totalPrice * (seatData.Promotion.pro_discount / 100))) + fee;
            } else if (seatData.Promotion?.pro_type_id === 3) {

                totalPriceplusfee = (totalPrice - quantity * seatData.Promotion.pro_discount) + fee;
            } else {

                totalPriceplusfee = totalPrice + fee;
            }
        } else {

            totalPriceplusfee = totalPrice + fee; 
        }
    } else {
        console.log("Promotion end date is not set.");
        totalPriceplusfee = totalPrice + fee; 
    }
    return (

        <Card className="grid grid-cols-1 lg:grid-cols-2">

            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">ประเภท/Type</h5>
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">ราคา/price</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="pt-3 pb-0 sm:pt-4">
                            <div className="flex items-center">
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        บัตรงาน {eventname}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Zone {seatData.seat_name} ( {seatData.seat_price} บาท )
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {seatData.seat_price} X {quantity}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {totalPrice} บาท
                                </div>

                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        ค่าธรรมเนียมบริการ/Service Fee ({serviceFee} Baht per ticket)
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {serviceFee}  X {quantity}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {serviceFee * quantity} บาท
                                </div>
                            </div>
                        </li>

                        <li className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        โปรโมชั่น/promotions
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {datepromotion ? ( // Check if datepromotion is defined
                                            startdatepromotion && (new Date().getTime() >= new Date(startdatepromotion).getTime() && new Date().getTime() <= new Date(datepromotion).getTime()) ? ( // Check if today is before or on promoDate
                                                // If the promo date is valid
                                                <>
                                                    {seatData.Promotion?.pro_type_id === 2 ? (
                                                        <h4 className="font-bold text-green-900">
                                                            โปรโมชั่น ลด {seatData.Promotion.pro_discount} %
                                                        </h4>
                                                    ) : seatData.Promotion?.pro_type_id === 3 ? (
                                                        <h4 className="font-bold text-blue-900">
                                                            โปรโมชั่น ลด {seatData.Promotion.pro_discount} บาท
                                                        </h4>
                                                    ) : seatData.Promotion?.pro_type_id === 1 ? (
                                                        <h4 className="font-bold text-red-900">
                                                            โปรโมชั่นของที่ระลึก {seatData.Promotion.pro_description} รับได้ที่หน้างาน
                                                        </h4>
                                                    ) : null}
                                                </>
                                            ) : ( // If today is after promoDate
                                                <h4 className="font-bold text-red-900">
                                                    ไม่มีโปรโมชั่น
                                                </h4>
                                            )
                                        ) : ( // If datepromotion is not defined
                                            <h4 className="font-bold text-red-900">
                                                ไม่มีโปรโมชั่น 
                                            </h4>
                                        )}
                                    </p>
                                </div>
                                {datepromotion && startdatepromotion && (new Date().getTime() < new Date(startdatepromotion).getTime() || new Date().getTime() > new Date(datepromotion).getTime()) ? ( // Check if datepromotion has passed
                                    <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-white">
                                        <p>ไม่มีโปรโมชั่น</p> {/* Message for expired promotion */}
                                    </div>
                                ) : seatData.Promotion?.pro_type_id === 2 ? (
                                    // ถ้าเป็นโปรโมชั่นลด %
                                    <div className="inline-flex items-center text-base font-semibold text-red-900 dark:text-white">
                                        {(totalPrice * (seatData.Promotion.pro_discount / 100)).toFixed(2)} บาท
                                    </div>
                                ) : seatData.Promotion?.pro_type_id === 3 ? (
                                    // ถ้าเป็นโปรโมชั่นลดเป็นจำนวนเงิน
                                    <div className="inline-flex items-center text-base font-semibold text-red-700 dark:text-white">
                                        {seatData.Promotion.pro_discount} บาท
                                    </div>
                                ) : null}
                            </div>
                        </li>




                        <div className="flex items-center justify-between mb-4 ">
                            <h6 className="mt-7 text-l font-bold leading-none text-[#daa520] dark:text-[#daa520]">ยอดเงินที่ต้องชำระ/Total Amount</h6>
                            <h6 className="mt-7 text-l font-bold leading-none text-[#daa520] dark:text-[#daa520]">{totalPriceplusfee} บาท</h6>
                        </div>



                    </ul>
                </div>
            </div>



            <div>
                {/* <h1>ราคา {totalPrice}</h1> */}
                <Card className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">หน้าชำระเงิน</h2>
                    <p>ชำระเงินค่าบัตรที่นี่</p>

                    <Elements stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: totalPriceplusfee * 100,
                            currency: "thb",
                        }}
                    >
                        <Checkoutpage amount={totalPriceplusfee * 100} quantity={quantity} seatdata={seatData} />
                    </Elements>




                    {/* เพิ่มปุ่มกลับไปยังหน้า Ticket */}
                    <button className="mt-4 py-2 px-6 bg-gray-300 rounded-lg text-lg hover:bg-gray-400 text-black" onClick={() => window.location.reload()}>
                        Back to Ticket
                    </button>
                </Card>
            </div>
        </Card>
    );
}

