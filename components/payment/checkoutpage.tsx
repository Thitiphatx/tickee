import React, { useEffect, useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,

} from "@stripe/react-stripe-js";
import { Seat_Type } from "@/types/data_type";
import { useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Checkoutpage({ amount ,quantity ,seatdata}: { amount: number,quantity:number,seatdata: Seat_Type }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const {data: session} = useSession();
    const [errormessage, seterrormessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setloading] = useState(false);

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))

    }, [amount]);

    if (!session) {
        router.push("/");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("click")
        event.preventDefault();
        setloading(true);
        if (!stripe || !elements) {
            return;
        }
        const { error: submitError } = await elements.submit();

        if (submitError) {
            seterrormessage(submitError.message)
            setloading(false)
            return;
        }
        else {
            console.log('Payment successful!');
            const receiptData = {
                rec_date: new Date(),
                rec_quantity: quantity, 
                rec_customer_id: session?.user.id,
                rec_seat_id: seatdata.seat_id,
            };

            fetch("/api/addreceipt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(receiptData),
            })
            .then((response) => {
                if (!response.ok) {
                    alert('Failed to create receipt.');
                    throw new Error("Failed to create receipt.");
                }
                return response.json();
            })
            .then((data) => {
                // การสร้างข้อมูลสำเร็จ
                console.log("Receipt created:", data);
        
                // แสดงข้อความยืนยันการชำระเงินที่สำเร็จ
                alert('Payment successful! Thank you for your purchase.');
                
            })
            .catch((error) => {
                // จัดการกับข้อผิดพลาดที่เกิดขึ้น
                console.error("Error creating receipt:", error);
                seterrormessage("Failed to create receipt.");
            });
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: "http://localhost:3000/"
            }
        })

        if (error) {
            seterrormessage(error.message)
        }
        

        setloading(false)

        if (!clientSecret || !stripe || !elements) {
            return (
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    return (<div>
        <form onSubmit={handleSubmit} className="bg-white rounded-md p-5 mt-5">
            {clientSecret && <PaymentElement />}
            {errormessage && <div className="text-black mt-3">{errormessage}</div>}
            <button disabled={!stripe || loading} type="submit" className="disabled:animate-pulse disabled:opacity-50 align-middle mt-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                {!loading ? `Pay ฿${amount/100}` : "Processing...."}
            </button>
        </form>

    </div>)
}
