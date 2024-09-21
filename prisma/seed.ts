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

    const eventType = await prisma.event_Type.create({
        data: {
            et_name: "Conference", // Use the correct field name
        },
    });

    const event = await prisma.event.create({
        data: {
            event_name: "Pepsi Presents Big Mountain Music Festival 14",
            event_intro:"ได้เวลารวมตัวกันอีกครั้งกับเทศกาลดนตรีที่ยิ่งใหญ่ที่สุดในประเทศไทย ตั้งแต่ปี 2553 เทศกาลดนตรีที่ผสมผสานความ Very Thai เข้ากับกระแสดนตรีแห่งยุคสมัย เกิดเป็น Culture ให้คนไทยทุกเพศ ทุกกลุ่ม ทุกวัยเข้าใจและรักการท่องเที่ยวเทศกาลดนตรี ปีนี้กลับมาทวงบัลลังก์ยืนหนึ่งเรื่องความสนุก ความอลังการ ด้วยคอนเซปต์ OG BMMF รวมต้นฉบับความโฮ่งที่ทุกคนชอบ เวที ดีไซน์ วงดนตรี ที่ทุกคนคิดถึง ปีนี้เราขนกลับมาหมดเพื่อแฟน ๆ ที่รักและซัพพอร์ตกันตลอด 14 ปี 7-8 ธันวาคมนี้ ดิ โอเชียน เขาใหญ่ แฟนเก่าก็ต้องไป แฟนใหม่ต้องรีบมา จัดหนักจัดเต็มของแทร่เพื่อทุกคน",
            event_description: "This is a sample event description.",
            event_images: "https://atkmedia.allticket.com/images/up/21174/BMMF14_08092024_Poster_SpecialCOW.jpg",
            event_start_date: new Date('2024-12-07T10:00:00.000Z'),
            event_last_date: new Date('2024-12-08T18:00:00.000Z'),
            event_location: JSON.stringify({
                address: "The Ocean เขาใหญ่",
                city: "นครราชสีมา",
                country: "thailand",
            }),
            event_seat_per_order: 5,
            producer_id: user.id, // Assuming this user is the producer
            event_type_id: eventType.et_id, // Use the correct event type ID
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