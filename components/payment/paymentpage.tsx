import { Card } from "@nextui-org/card";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutpage from "./checkoutpage";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("Public key undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment({ totalPrice }: { totalPrice: number }) {
    return (

        <Card className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                ข้อมูลตั๋ว
            </div>

            <div>
                {/* <h1>ราคา {totalPrice}</h1> */}
                <Card className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Payment Page</h2>
                    <p>Proceed with your payment here.</p>

                    <Elements stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: totalPrice,
                            currency: "thb",
                        }}
                    >
                        <Checkoutpage amount={totalPrice} />
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

