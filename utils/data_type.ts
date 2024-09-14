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
    name: string,
    surname: string
    idcard: string
    birthdate: Date
    phone: string
}