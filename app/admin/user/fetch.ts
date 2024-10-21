
import { prisma } from "@/lib/prisma";

export async function getSelectedUser(input: string) {
    let output;
    if (input == "") {
        try {
            output = await prisma.user.findMany({
                orderBy: {
                    name: "asc"
                }
            })
        } catch (error) {
            console.log("getSelectedUser1 Error")
            return null
        }
    }
    else {
        try {
            output = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            email: {
                                contains: input
                            }
                        },
                        {
                            name: {
                                contains: input
                            }
                        },
                    ],
                },
                orderBy: {
                    name: "asc"
                }
            })
        } catch (error) {
            console.log("getSelectedUser2 Error")
            return null
        }
    }
    return output
}


export async function deleteUser(uid: string) {
    try {
        const output = await prisma.user.delete({
            where: {
                id: uid
            }
        })
    } catch (error) {
        console.log("deleteUser error")
        return null
    }
}

export async function editUser(id: string, email: string, name: string, role: string) {
    try {
        const output = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email,
                role: role
            },
        })
    } catch (error) {
        console.log("editUser error")
        return null
    }
}
