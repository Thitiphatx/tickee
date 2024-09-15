

import { Receipt, Seat_Type } from "@prisma/client";


interface RecSeat extends Receipt {
    rec_seat: Seat_Type
}

function calculation(rec: RecSeat[]) {
    let processedData = []
    let selectedDay = 0
    let adjustableLength = 0

    for (let index = rec.length - 1; index >= 0; index--) {
        if (rec[index].rec_date.getDay() == selectedDay) {
            adjustableLength = index;
            break;
        }
    }
    let temp = 0
    for (let index = adjustableLength; index >= 0; index--) {
        if (rec[index].rec_date.getDay() == selectedDay) {
            for (let day = 0; day < 7; day++) {
                if (index + day >= adjustableLength) {
                    processedData.unshift([(temp / day), rec[index].rec_date])
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
    return (
        <div className="bg-white h-full m-20">
            <h1 className="text-black">graph</h1>
        </div>
    )
};
