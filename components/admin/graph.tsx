"use client"

import { Receipt, Seat_Type } from "@prisma/client";
import { notFound } from "next/navigation";

import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from "react";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface RecSeat extends Receipt {
    rec_seat: Seat_Type
}

function calculation(rec: RecSeat[]) {
    let processedData: { x: string; y: number }[] = []
    let yearListData = []
    let sunday = 0, saturday = 6
    let adjustableLength = 0, weeklyOrders = 0
    if (rec.length == 0) {
        return
    }
    for (let index = rec.length - 1; index >= 0; index--) {
        if (new Date(rec[index].rec_date).getDay() == saturday) {
            adjustableLength = index;
            break;
        }
    }
    // batch calculation (rec[index].rec_date.getDay() == saturday)
    let sum = 0, temp = 0, year = 0
    let calculated = false, period = false
    for (let index = adjustableLength; index >= 0; index--) {
        if (!period) {
            year = new Date(rec[index].rec_date).getFullYear()
            period = true
        } else if (index - 1 >= 0 && new Date(rec[index - 1].rec_date).getFullYear() != year) {
            period = false
            yearListData.push(processedData)
            processedData = []
        } else if (new Date(rec[index].rec_date).getDay() == sunday && !calculated) {
            temp = weeklyOrders
            calculated = true
            while (temp >= 0) {
                if (temp == 0) {
                    processedData.unshift(
                        {
                            x: rec[index].rec_date.toDateString(),
                            y: (sum / 7)
                        })
                    sum = 0
                    weeklyOrders = 0
                } else {
                    sum += (rec[index + temp].rec_quantity * rec[index + temp].rec_seat.seat_price)
                    temp--
                }
            }
        } else {
            if (calculated && new Date(rec[index].rec_date).getDay() == saturday) {
                calculated = false
            }
            weeklyOrders++
        }
    }
    return yearListData
}

export default function Graph() {
    const [receiptOrders, setReceiptOrders] = useState<RecSeat[] | null>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/graph');
                const data = await res.json();
                setReceiptOrders(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    if (receiptOrders == null) {
        console.log("error receiptOrders")
        // return
        notFound()
    }
    const calculatedData = calculation(receiptOrders) || []

    const chartData: { x: string; y: number }[] = [
        { x: '2023-01-01T00:00:00', y: 65 },
        { x: '2023-04-05T00:00:00', y: 59 },
        { x: '2023-09-10T00:00:00', y: 80 },
        { x: '2023-10-15T00:00:00', y: 81 },
        { x: '2023-10-20T00:00:00', y: 56 },
        { x: '2023-12-25T00:00:00', y: 55 },
        { x: '2023-12-30T00:00:00', y: 40 },
    ];
    const data = {
        datasets: calculatedData.map((item: { x: string; y: number }[], index) => ({
            label: `Year ${new Date().getFullYear() - calculatedData.length - 1}`,
            data: item,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }))
    };
    return (
        <>
            <h1 className="font-bold text-inherit uppercase text-3xl">Graph</h1>
            <div className="flex w-full justify-center px-20 py-3">
                <Line
                    className="size-full"
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                type: "time",
                                time: {
                                    unit: 'month',
                                },
                                title: {
                                    display: true,
                                    text: 'poon the data',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Value',
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Time-Series Line Chart',
                            },
                        }
                    }} />
            </div>
        </>
    )
};
