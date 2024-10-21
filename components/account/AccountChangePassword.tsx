"use client"

import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { DatePicker } from "@nextui-org/date-picker"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { User } from "@prisma/client"
import { useState } from "react"

export default function AccountChangePassword({ userData }: { userData: User }) {
    const [data, setData] = useState<User>(userData);
    const handleSubmit = async ()=> {
        const response = await fetch('/api/editprofile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create event');
          }
    
          const result = await response.json();
    }
    return (
        <Card>
            <CardHeader>
                <h2 className="font-bold uppercase">my profile</h2>
            </CardHeader>
            <CardBody className="space-y-2">
                <Input label="ID" value={data.id} disabled/>
                <Input label="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, email: e.target.value})} value={data.email ?? ""} />
                <Input label="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, name: e.target.value})} value={data.name ?? ""}/>
                <Input label="Mobile" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, mobile: e.target.value})} value={data.mobile ?? ""}/>
                <DatePicker label="Birthdate"/>
                <Input label="ID card" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, idCard: e.target.value})} value={data.idCard ?? ""} required/>
                <RadioGroup onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, role: e.target.value})} orientation="horizontal" label="Role selection (for test)" defaultValue={data.role}>
                    <Radio value="user">User</Radio>
                    <Radio value="producer">Producer</Radio>
                    <Radio value="admin">Admin</Radio>
                </RadioGroup>
                <Button onClick={handleSubmit} radius="full" color="primary">Save</Button>
            </CardBody>
        </Card>
    )
}
