"use client"

import { getReceiptDate } from "@/app/admin/fetch";
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
    let processedData = []
    let selectedDay = 0
    let adjustableLength = 0
    if (rec.length == 0) {
        return
    }
    for (let index = rec.length - 1; index >= 0; index--) {
        if (rec[index].rec_date.getDay() == selectedDay) {
            adjustableLength = index - 1;
            break;
        }
    }
    let temp = 0
    for (let index = adjustableLength; index >= 0; index--) {
        if (rec[index].rec_date.getDay() == selectedDay) {
            for (let day = 0; day < 7; day++) {
                if (index + day >= adjustableLength) {
                    processedData.unshift({ x: rec[index].rec_date, y: (temp / (day + 1)) })
                    temp = 0
                } else {
                    temp += (rec[index + day].rec_quantity * rec[index + day].rec_seat.seat_price)
                }
            }
        }
    }
    return processedData
}

export default function Graph() {
    const [dataDB, setDataDB] = useState<RecSeat[] | null>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/graph'); 
                const data = await res.json();
                setDataDB(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    if (dataDB == null) {
        console.log("error dataDB")
        // return
    }
    // const processedData = calculation(dataDB)

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
        datasets: [
            {
                label: 'Dataset 1',
                data: chartData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
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
