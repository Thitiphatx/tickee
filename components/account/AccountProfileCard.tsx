"use client"

import { getLocalTimeZone, parseDate, parseZonedDateTime } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { DatePicker } from "@nextui-org/date-picker"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { User } from "@prisma/client"
import { useState } from "react"

export default function AccountProfileCard({ userData }: { userData: User }) {
    const [data, setData] = useState<User>(userData);
    const handleEditProfile = async ()=> {
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
    const handleChangePassword = async ()=> {
        // const response = await fetch('/api/changepassword', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   });
    
        //   if (!response.ok) {
        //     throw new Error('Failed to create event');
        //   }
    
        //   const result = await response.json();
    }
    return (
        <div className="space-y-5">
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
                    <Button onClick={handleEditProfile} radius="full" color="primary">Save</Button>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <h2 className="font-bold uppercase">change password</h2>
                </CardHeader>
                <CardBody className="space-y-2">
                    <Input label="Current password"/>
                    <Input label="New password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, email: e.target.value})}/>
                    <Input label="Re-new password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setData({...data, name: e.target.value})}/>
                    <Button onClick={handleChangePassword} radius="full" color="primary">Save</Button>
                </CardBody>
            </Card>
        </div>
    )
}
