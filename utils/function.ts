import { prisma } from "@/lib/prisma";
import { ReceiptStatus, RoleAvailable } from "../types/data_type";
import { Admin_Data, Event_Type, Promotion_Type } from "@prisma/client";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export async function searchEventwithTag(input: string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include: {
                event_type: true,
                producer: true,
            }, where: {
                event_type: {
                    et_name: input
                }
            }, orderBy: {
                event_last_date: "asc"
            }
        })
    } catch (error) {
        
        return null
    }
    return output
}

export async function searchEventwithName(input: string) {
    let output;
    try {
        output = await prisma.event.findMany({
            include: {
                event_type: true,
                producer: true,
            }, where: {
                event_name: {
                    contains: input
                }
            }, orderBy: {
                event_last_date: "asc"
            }
        })
    } catch (error) {
        
        return null
    }
    return output
}
export async function fetchEvent() {
    const event = await prisma.event.findMany();
    return {
        event
    }
}


export async function getBusinessData() {
    let admin: Admin_Data | null
    try {
        admin = await prisma.admin_Data.findFirst({})

    } catch (error) {
        
        return null
    }

    return admin
}

export async function updateBusinessData(newImages: string[], newFee: number) {
    let output;
    try {
        output = await getBusinessData()

        let updateData = await prisma.admin_Data.update({
            where: {
                ad_id: output?.ad_id
            },
            data: {
                banner_images: newImages,
                fee: newFee
            }
        })

        return updateData
    } catch (error) {
        
        return null
    }
}

export function redirectingByRole(session: Session | null) {
    if (session?.user.role == RoleAvailable.User || !session) {
        redirect("/")
    } else if (session?.user.role == RoleAvailable.Admin) {
        redirect("/admin")
    } else if (session?.user.role == RoleAvailable.Organizer) {
        redirect("/event-organizer")
    }
}

export async function autoChangeReceiptStatus() {
    let output;
    let today = new Date()
    try {
        output = await prisma.receipt.findMany({
            where: {
                rec_seat: {
                    event_seat: {
                        event_last_date: {
                            lt: today, 
                        },
                    },
                },
            },
            select: {
                rec_id: true,
            },
        });

        if (!output) {
            throw Error
        }

        const receiptIds = output.map((receipt) => receipt.rec_id);

        await prisma.receipt.updateMany({
            where: {
                rec_id: {
                    in: receiptIds,
                },
            },
            data: {
                rec_status:ReceiptStatus.Expired
            }
        })
        return output
    } catch (error) {
        return null
    }
}

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
                                y: (sum)
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
