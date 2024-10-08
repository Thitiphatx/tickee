import { Event_Type, Event, Seat_Dispatch, Prisma } from "@prisma/client"

export interface Address {
    street: string
    sub_district: string
    district: string
    province: string
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
                Seat_Dispatch: true
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

export enum RoleAvailable  {
    User = 'user',
    Organizer = 'organizer',
    Admin = 'admin',
}