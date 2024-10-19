import { Event_Type, Event, Seat_Dispatch, Prisma, Admin_Data, Promotion_Type } from "@prisma/client"

export interface Address {
    address: string,
    city: string,
    country: string
}


export interface SignInData {
    email: string
    password: string
}

export interface SignUpData {
    email: string
    password: string
    name: {
        name: string,
        surname: string
    }
    idcard: string
    birthdate: Date
    phone: string
}

export type EventLandingData = Prisma.EventGetPayload<{
    include: {
        event_type: true,
        Seat_Type: {
            include: {
                Seat_Dispatch: true,
                Promotion:{
                    include:{
                        pro_type:true
                    }
                }
            }
        }
    }
}>

export interface Seat_Type {
    seat_id: number;
    seat_name: string;
    seat_price: number;
    seat_create_date: Date;
    seat_due_date: Date;
    event_seat_id: number;
    Seat_Dispatch?: Seat_Dispatch; // Include this if it's optional
}

export interface BusinessData {
    admin: Admin_Data | null;
    eventType: Event_Type[];
    promotionType: Promotion_Type[];
}

export enum RoleAvailable  {
    User = 'user',
    Organizer = 'organizer',
    Admin = 'admin',
}

export enum ReceiptStatus  {
    Success = 0,
    Expired = 1,
    UnableToReturn = 2,
    ReturnRequest = 3,
    ReturnSuccess = 4,
}