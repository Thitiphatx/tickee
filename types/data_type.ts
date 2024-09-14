import { Event_Type, Event, Seat_Type, Seat_Dispatch, Prisma } from "@prisma/client"

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
    name:{
        name:string,
        surname:string
    }
    idcard:string
    birthdate:Date
    phone:string
}

export type EventLandingData = Prisma.EventGetPayload<{include: {
    event_type: true,
    Seat_Type: {
        include: {
            Seat_Dispatch: true
        }
    }
}}>