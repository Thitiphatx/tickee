"use client"

import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
// import { DatePicker } from "@nextui-org/date-picker"
import { Input } from "@nextui-org/input"

export default function AccountProfileCard() {
    return (
        <Card>
            <CardHeader>
                <h2 className="font-bold uppercase">my profile</h2>
            </CardHeader>
            <CardBody className="space-y-2">
                <Input label="Email" />
                <Input label="First name" />
                <Input label="Last name" />
                <Input label="Phone" />
                {/* <DatePicker label="Birthday" /> */}
                <Button radius="full" color="primary">Save</Button>
            </CardBody>
        </Card>
    )
}
