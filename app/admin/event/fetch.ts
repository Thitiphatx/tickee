import { prisma } from "@/lib/prisma";

export async function getSelectedEvent(input: string) {
    let output;
    if (input == "") {
        try {
            output = await prisma.event.findMany({
                include: {
                    event_type: true,
                    Seat_Type:true
                }
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
                    Seat_Type:true
                }
                , where: {
                    event_name: {
                        contains: input
                    }

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
        console.log("deleteEvent error\n",error)
        return null
    }
}