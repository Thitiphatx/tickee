import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const role = await prisma.role.create({
        data: {
            role_name: "Admin",
        },
    });

    // Upsert a user
    const user = await prisma.user.upsert({
        where: { user_email: 'test@test.com' },
        update: {},
        create: {
            user_email: 'test@test.com',
            user_name: {
                firstName: 'Test',
                lastName: 'User',
            },
            user_password: '12345',
            user_IDcard: 'A1234567',
            user_birthdate: new Date('1990-01-01'),
            user_phone: '123-456-7890',
            user_role_id: role.role_id,
        },
    });

    const eventType = await prisma.event_Type.create({
        data: {
            et_name: "Conference", // Use the correct field name
        },
    });

    const event = await prisma.event.create({
        data: {
            event_name: "Pepsi Presents Big Mountain Music Festival 14",
            event_description: "This is a sample event description.",
            event_images: {name:"https://www.efinancethai.com/news/picture/2024/6/27/T/7248597.jpg"},
            event_start_date: new Date('2024-10-10T10:00:00Z'),
            event_last_date: new Date('2024-10-12T18:00:00Z'),
            event_location: JSON.stringify({
                address: "123 Main St",
                city: "Sample City",
                country: "Country",
            }),
            event_seat_per_order: 5,
            producer_id: user.user_id, // Assuming this user is the producer
            event_type_id: eventType.et_id, // Use the correct event type ID
        },
    });

    console.log({ user, event });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })