"use client"

import { parseDate } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { DatePicker } from "@nextui-org/date-picker"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { Spinner } from "@nextui-org/react"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AccountProfileCard({ userData }: { userData: User }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [validation, setValidation] = useState(
        {
            name: {
                regex: /^[\wก-๙a-zA-Z]{4,30}$/,
                errorMsg: "ต้องการอักขระ ภาษาไทย, อังกฤษจำนวน 4-30 ตัว",
                isError: false,
            },
            email: {
                regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                errorMsg: "กรุณากรอก email ให้ถูกต้อง",
                isError: false
            },
            mobile: {
                regex: /^0\d{9}$/,
                errorMsg: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 0xxxxxxxxx",
                isError: false
            },
            date: {
                errorMsg: "วันเกิดต้องเป็นอดีตเท่านั้น",
                isError: false
            },
            idcard: {
                regex: /^[0-9]{14}$/,
                errorMsg: "กรุณากรอกบัตรประชาชน 14 หลัก",
                isError: false
            },
            result: {
                errorMsg: "email หรือรหัสผ่านไม่ถูกต้อง",
                isError: false
            }
        }
    )
    const { data: session, update } = useSession();
    const [data, setData] = useState<User>(userData);

    useEffect(()=> {
        setSuccess(false);
    }, [data])

    const handleEditProfile = async () => {
        setLoading(true);
    
        // Check for empty required fields (both null and empty string)
        if (!data.name || !data.email || !data.mobile || !data.idCard) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: "กรุณากรอกข้อมูลให้ครบถ้วน",
                },
            }));
            setLoading(false);
            return;
        }
    
        // Additional validation checks if any
        if (validation.email.isError || validation.idcard.isError || validation.mobile.isError || validation.name.isError || validation.date.isError) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: "กรุณากรอกข้อมูลให้ถูกต้อง",
                },
            }));
            setLoading(false);
            return;
        }
    
        // Send data to the server
        const response = await fetch('/api/editprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        const result = await response.json();
        if (result.error) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: result.error,
                },
            }));
        } else {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: false,
                    errorMsg: "",
                },
            }));
            setSuccess(true);
        }
        setLoading(false);
        update();
        router.refresh();
    };

    const handleDateChange = (value: any) => {
        const bd = new Date(value);
        const currentDate = new Date();
        setData({ ...data, birthDate: bd })
        let newValidation = validation
        if (currentDate.getTime() - bd.getTime() <= 0) {
            newValidation.date.isError = true
        } else {
            newValidation.date.isError = false
        }
        setValidation(newValidation)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setData({...data, email: e.target.value})
        let newValidation = validation
        if (!validation.email.regex.test(e.target.value)) {
            newValidation.email.isError = true
        } else {
            newValidation.email.isError = false
        }
        setValidation(newValidation)
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setData({...data, name: e.target.value})
        let newValidation = validation
        if (!validation.name.regex.test(e.target.value)) {
            newValidation.name.isError = true
        } else {
            newValidation.name.isError = false
        }
        setValidation(newValidation)
    }
    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setData({...data, mobile: e.target.value})
        let newValidation = validation
        if (!validation.mobile.regex.test(e.target.value)) {
            newValidation.mobile.isError = true
        } else {
            newValidation.mobile.isError = false
        }
        setValidation(newValidation)
    }
    const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setData({...data, idCard: e.target.value})
        let newValidation = validation
        if (!validation.idcard.regex.test(e.target.value)) {
            newValidation.idcard.isError = true
        } else {
            newValidation.idcard.isError = false
        }
        setValidation(newValidation)
    }

    return (
        <Card>
            <CardHeader>
                <h2 className="font-bold uppercase">my profile</h2>
            </CardHeader>
            <CardBody className="space-y-2">
                <Input isRequired label="Email" isInvalid={validation.email.isError} errorMessage={validation.email.errorMsg} onChange={handleEmailChange} value={data.email ?? ""} />
                <Input isRequired label="Name" isInvalid={validation.name.isError} errorMessage={validation.name.errorMsg} onChange={handleNameChange} value={data.name ?? ""} />
                <Input isRequired label="Mobile" isInvalid={validation.mobile.isError} errorMessage={validation.mobile.errorMsg} maxLength={10} onChange={handleMobileChange} value={data.mobile ?? ""} />
                <DatePicker
                    isRequired
                    isInvalid={validation.date.isError}
                    errorMessage={validation.date.errorMsg}
                    label="Birthdate"
                    onChange={(value) => handleDateChange(value)}
                    value={parseDate(data.birthDate?.toISOString().split('T')[0] as string)}
                />
                <Input isRequired label="ID card" isInvalid={validation.idcard.isError} errorMessage={validation.idcard.errorMsg} onChange={handleIdCardChange} value={data.idCard ?? ""} required />
                <RadioGroup onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, role: e.target.value })} orientation="horizontal" label="Role selection (for test)" defaultValue={data.role}>
                    <Radio value="user">User</Radio>
                    <Radio value="organizer">Organizer</Radio>
                    <Radio value="admin">Admin</Radio>
                </RadioGroup>
                {validation.result.isError && <span className="auth-error">{validation.result.errorMsg}</span>}
                {success && <span className="text-success-500">แก้ไขข้อมูลสำเร็จ</span>}
                <Button isLoading={loading} spinner={<Spinner color="white" size="sm" />} onClick={handleEditProfile} radius="full" color="primary">Save</Button>
            </CardBody>
        </Card>
    )
}
