"use client"

import { parseAbsoluteToLocal, parseDate } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { DatePicker } from "@nextui-org/date-picker"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AccountProfileCard({ userData }: { userData: User }) {
    const router = useRouter();
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
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState({
        current: "",
        new1: "",
        new2: "",
    });
    const [passwordErrors, setPasswordErrors] = useState({
        current: false,
        new1: false,
        new2: false,
    });

    const handleEditProfile = async () => {
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
        update();
        router.refresh();
    }

    const handleDateChange = (value: any) => {
        const bd = new Date(value);
        setData({ ...data, birthDate: bd })
    }

    const handleChangePassword = async () => {
        if (!changePasswordValidation()) {
            return;
        }
        const response = await fetch('/api/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                password,
            }),
        });

        const result = await response.json();
        if (result.error) {
            setError(result.error);
        } else {
            setError(null);
        }
    };

    const changePasswordValidation = () => {
        const { current, new1, new2 } = password;
        const newErrors = { current: false, new1: false, new2: false };

        if (!current) {
            newErrors.current = true;
            setError("Please enter your current password");
        }

        if (new1 !== new2) {
            newErrors.new1 = true;
            newErrors.new2 = true;
            setError("Password do not match");
        }

        if (!new1 || !new2) {
            newErrors.new1 = true;
            newErrors.new2 = true;
            setError("Please enter your new password");
        }

        setPasswordErrors(newErrors);
        return !newErrors.current && !newErrors.new1 && !newErrors.new2;
    }

    return (
        <div className="space-y-5">
            <Card>
                <CardHeader>
                    <h2 className="font-bold uppercase">my profile</h2>
                </CardHeader>
                <CardBody className="space-y-2">
                    <Input label="Email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })} value={data.email ?? ""} />
                    <Input label="Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, name: e.target.value })} value={data.name ?? ""} />
                    <Input label="Mobile" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, mobile: e.target.value })} value={data.mobile ?? ""} />
                    <DatePicker
                        label="Birthdate"
                        onChange={(value) => handleDateChange(value)}
                        value={parseDate(data.birthDate?.toISOString().split('T')[0] as string)}
                    />
                    <Input label="ID card" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, idCard: e.target.value })} value={data.idCard ?? ""} required />
                    <RadioGroup onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, role: e.target.value })} orientation="horizontal" label="Role selection (for test)" defaultValue={data.role}>
                        <Radio value="user">User</Radio>
                        <Radio value="organizer">Organizer</Radio>
                        <Radio value="admin">Admin</Radio>
                    </RadioGroup>
                    <Button onClick={handleEditProfile} radius="full" color="primary">Save</Button>
                </CardBody>
            </Card>
            {userData.provider == "credentials" && (
                <Card>
                    <CardHeader>
                        <h2 className="font-bold uppercase">change password</h2>
                    </CardHeader>
                    <CardBody className="space-y-2">
                        <Input
                            isRequired
                            label="Current password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword({ ...password, current: e.target.value });
                                setPasswordErrors({ ...passwordErrors, current: false }); // Reset error on change
                            }}
                            isInvalid={passwordErrors.current}
                        />
                        <Input
                            isRequired
                            label="New password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword({ ...password, new1: e.target.value });
                                setPasswordErrors({ ...passwordErrors, new1: false }); // Reset error on change
                            }}
                            isInvalid={passwordErrors.new1}
                        />
                        <Input
                            isRequired
                            label="Re-new password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword({ ...password, new2: e.target.value });
                                setPasswordErrors({ ...passwordErrors, new2: false }); // Reset error on change
                            }}
                            isInvalid={passwordErrors.new2}
                        />
                        <span className="auth-error">{error}</span>
                        <Button 
                            isDisabled={passwordErrors.current || passwordErrors.new1 || passwordErrors.new2}
                            onClick={handleChangePassword} radius="full" color="primary">Save</Button>
                    </CardBody>
                </Card>
            )}

        </div>
    )
}
