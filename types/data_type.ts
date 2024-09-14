import { Event_Type, Event, Seat_Type } from "@prisma/client"

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

export interface EventLandingData extends Event {
    event_type: Event_Type
    Seat_Type: Seat_Type

}