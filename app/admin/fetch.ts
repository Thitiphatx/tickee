import { prisma } from "@/lib/prisma";
import { ReceiptStatus } from "@/types/data_type";

export async function getReceiptDate() {
    let output;
    let processedData: { x: string; y: number }[] = []
    let yearListData: { x: string; y: number }[][] = []
    let yearArray: number[] = [];
    let weeklyOrders = 1
    let sum = 0, temp = 0, year = 0, yearCount = 1
    let dateString: Date
    let period = false
    try {
        output = await prisma.receipt.findMany({
            // where: {
            //     rec_status: ReceiptStatus.Expired
            // },
            include: {
                rec_seat: true
            },
            orderBy: {
                rec_date: "asc"
            }
        })
        if (output.length == 0) {
            return
        }

        for (let index = output.length - 1; index >= 0 && yearCount <= 5; index--) {
            if (!period) {
                year = new Date(output[index].rec_date).getFullYear()
                yearArray.push(year)
                period = true
            } else if (
                new Date(output[index].rec_date).getFullYear() != year &&
                yearCount <= 5
            ) {
                period = false
                yearListData.push(processedData)
                processedData = []
                yearCount++
            }
            if ((
                index - 1 >= 0 &&
                yearCount <= 5 &&
                getWeekStartDate(new Date(output[index].rec_date)) !== getWeekStartDate(new Date(output[index - 1].rec_date))) ||
                index == 0
            ) {
                temp = weeklyOrders
                while (temp >= 0) {
                    if (temp == 0) {
                        dateString = new Date(output[index].rec_date)
                        processedData.unshift(
                            {
                                x: dateString.toISOString(),
                                y: (sum / weeklyOrders)
                            })
                        sum = 0
                        weeklyOrders = 1
                        temp--
                    } else {
                        sum += (output[index + temp - 1].rec_quantity * output[index + temp - 1].rec_seat.seat_price)
                        temp--
                    }
                }

                if (index == 0) {
                    period = false
                    yearListData.push(processedData)
                    processedData = []
                    yearCount++
                }
            } else {
                weeklyOrders++
            }
        }
        
        const data = {
            datasets: yearListData.map((item: { x: string; y: number }[], index) => ({
                label: `Year ${new Date().getFullYear() - index}`,
                borderColor: `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 1)`,
                backgroundColor: `rgba(255, 255, 255, 0.2)`,
                data: item
            }))
        };
        return { data, yearArray }
    } catch (error) {
        console.log("getReceiptDateToPlot Error\n", error)
        return null
    }
}

function getWeekStartDate(date: Date) {
    const day = new Date(date);
    const firstDayOfWeek = day.getDate() - day.getDay();
    const weekStartDate = new Date(day.setDate(firstDayOfWeek));
    weekStartDate.setHours(0, 0, 0, 0);
    return weekStartDate.getTime();
};
