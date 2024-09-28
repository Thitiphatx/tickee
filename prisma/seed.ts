import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

async function main(){
    // const role = await prisma.role.create({
    //     data: {
    //         role_name: "Admin",
    //     },
    // });

    const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            name: "testUser",
            password: hashSync("123", 10),
        },
    });

}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })