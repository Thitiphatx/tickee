import { prisma } from "@/lib/prisma";

export async function getSelectedEvent(input: string) {
    let output;
    const currentDate = new Date();

    if (input == "") {
        try {
            output = await prisma.event.findMany({
                // where: {
                //     event_last_date: {
                //         gt: currentDate,
                //     },
                // },
                include: {
                    event_type: true,
                    Seat_Type: true
                },
                orderBy: {
                    event_last_date: "asc"
                },
            })
        } catch (error) {
            console.log("getSelectedEvent1 Error")
            return null
        }
    }
    else {
        try {
            output = await prisma.event.findMany({
                include: {
                    event_type: true,
                    Seat_Type: true
                }
                ,
                where: {
                    event_name: {
                        contains: input
                    },
                    // event_last_date: {
                    //     gt: currentDate,
                    // },
                },
                orderBy: {
                    event_last_date: "asc"
                }
            })
        } catch (error) {
            console.log("getSelectedEvent2 Error")
            return null
        }
    }
    return output
}

export async function deleteEvent(id: number) {
    try {
        const output = await prisma.event.delete({
            where: {
                event_id: id
            }
        })
    } catch (error) {
        console.log("deleteEvent error\n", error)
        return null
    }
}