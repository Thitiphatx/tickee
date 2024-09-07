import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function TicketInformation(){
    const [quantity, setQuantity] = useState(1);
    const unitPrice = 4500;

  // Function to handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  return (
    <Card className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Ticket Information</h2>

      <div className="grid grid-cols-2 gap-y-4 text-lg">
        <span>Match</span>
        <span className="font-medium">LIVERPOOL REDS VS MANCHESTER REDS</span>

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
          <button className="px-4 py-2  rounded hover:bg-gray-400" onClick={decreaseQuantity}>-</button>
          <span className="font-medium">{quantity}</span>
          <button className="px-4 py-2  rounded hover:bg-gray-400" onClick={increaseQuantity}>+</button>
        </div>

        <span>Unit Price (Baht)</span>
        <span className="font-medium">{unitPrice.toLocaleString()}</span>

        <span>Total Price (Baht)</span>
        <span className="font-medium">{(quantity * unitPrice).toLocaleString()}</span>
      </div>

      <div className="flex justify-between mt-8">
        <button className="py-2 px-6 bg-gray-300 rounded-lg text-lg hover:bg-gray-400 text-black" >
          Back
        </button>
        <button className="py-2 px-6 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-700">
          Booking
        </button>
      </div>
    </Card>
  );
};

    