import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const role = await prisma.role.create({
        data: {
          role_name: "Admin",
        },
      });
    const user = await prisma.user.upsert({
        where: {user_email: 'test@test.com'},
        update: {},
        create: {
            user_email: 'test@test.com',
            user_name: {
                firstName: 'Test',
                lastName: 'User'
            },
            user_password: '12345',
            user_IDcard: 'A1234567',
            user_birthdate: new Date('1990-01-01'),
            user_phone: '123-456-7890',
            user_role_id: role.role_id // Assuming role_id 1 exists in your Role table
        }
    })
    console.log({user})
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })