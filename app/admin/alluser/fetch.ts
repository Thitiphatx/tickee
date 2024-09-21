import { Selected } from "@/components/userTable";
import { prisma } from "@/lib/prisma";
import { Role, User } from "@prisma/client";
import { utimes } from "fs";

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

export async function getRole() {
    let output;
        try {
            output = await prisma.role.findMany({})
        } catch (error) {
            console.log("getRole Error")
            return null
        }
    return output
}

export async function deleteUser(uid: number) {
    try {
        const output = await prisma.user.delete({
            where: {
                user_id: uid
            }
        })
    } catch (error) {
        console.log("deleteUser error")
        return null
    }
}

export async function editUser(id:number,email:string,name:string,surname:string,role:string) {
    try {
        const roleData = await prisma.role.findFirst({
            where:{
                role_name:role,
            }
        })

        const output = await prisma.user.update({
            include:{
                user_role:true
            },
            where: {
                user_id: id
            },
            data: {
                user_name: name,
                user_email:email,
                user_surname:surname,
                user_role_id:roleData?.role_id  
            }
        })
    } catch (error) {
        console.log("editUser error")
        return null
    }
}