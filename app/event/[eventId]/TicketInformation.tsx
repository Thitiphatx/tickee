import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

// สร้าง PaymentPage component


export default function TicketInformation({ onBookingClick }: { onBookingClick: (totalPrice: number) => void }) {
    const [quantity, setQuantity] = useState(1);
    const unitPrice = 4500;

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const totalPrice = quantity * unitPrice;

    return (
        <div>

            <Card className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Ticket Information</h2>

                <div className="grid grid-cols-2 gap-y-4 text-lg">
                    <span>Match</span>
                    <span className="font-medium">
                        LIVERPOOL REDS VS MANCHESTER REDS
                    </span>

                    <span>Round</span>
                    <span className="font-medium">12 Oct 2024 Time 18:00</span>

                    <span>Stand</span>
                    <span className="font-medium">LIVERPOOL (West)</span>

                    <span>Zone</span>
                    <span className="font-medium">LB1</span>

                    <span>Seat No</span>
                    <span className="font-medium">Festival Seat</span>

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
                    <span className="font-medium">{unitPrice.toLocaleString()}</span>

                    <span>Total Price (Baht)</span>
                    <span className="font-medium">
                        {(quantity * unitPrice).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between mt-8">
                    <Button>Back</Button>
                    {/* คลิก Booking แล้วแสดงหน้า Payment */}
                    <Button color="primary" onClick={() => onBookingClick(totalPrice)}>Booking</Button>
                </div>
            </Card>
        </div>
    );
}
