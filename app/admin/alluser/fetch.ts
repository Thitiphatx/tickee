import { prisma } from "@/lib/prisma";

export async function getSelectedUser(input: string) {
    let output;
    if (input == "") {
        try {
            output = await prisma.user.findMany({
                include: {
                    user_role: true
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
                include: {
                    user_role: true
                }
                , where: {
                    OR: [
                        {
                            user_email: {
                                contains: input
                            }
                        },
                        {
                            user_name: {
                                contains: input
                            }
                        },
                        {
                            user_role: {
                                role_name: {
                                    contains: input
                                }
                            }
                        },
                    ],
                }
            })
        } catch (error) {
            console.log("getSelectedUser2 Error")
            return null
        }
    }
    return output
}