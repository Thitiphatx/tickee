"use client"

import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/react"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function AccountChangePassword({ userData }: { userData: User }) {
    const [data, setData] = useState<User>(userData);
    const [loading, setLoading] = useState<boolean>(false);
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

    const handleChangePassword = async () => {
        setLoading(true);
        if (!changePasswordValidation()) {
            setLoading(false);
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
            signOut();
            setError(null);
        }
        setLoading(false);
    };

    const changePasswordValidation = () => {
        const { current, new1, new2 } = password;
        const newErrors = { current: false, new1: false, new2: false };

        if (!current) {
            newErrors.current = true;
            setError("กรุณากรอกรหัสผ่านปัจจุบัน");
        }

        if (new1 !== new2) {
            newErrors.new1 = true;
            newErrors.new2 = true;
            setError("รหัสผ่านไม่ตรง");
        }

        if (!new1 || !new2) {
            newErrors.new1 = true;
            newErrors.new2 = true;
            setError("กรุณากรอก ช่องรหัสผ่านที่จะเปลี่ยน");
        }

        setPasswordErrors(newErrors);
        return !newErrors.current && !newErrors.new1 && !newErrors.new2;
    }
    return (
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
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword({ ...password, new1: e.target.value });
                        setPasswordErrors({ ...passwordErrors, new1: false }); // Reset error on change
                    }}
                    isInvalid={passwordErrors.new1}
                />
                <Input
                    isRequired
                    label="Re-new password"
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword({ ...password, new2: e.target.value });
                        setPasswordErrors({ ...passwordErrors, new2: false }); // Reset error on change
                    }}
                    isInvalid={passwordErrors.new2}
                />
                {error && <span className="auth-error">{error}</span>}
                <Button
                    isLoading={loading}
                    spinner={<Spinner color="white" size="sm" />}
                    isDisabled={passwordErrors.current || passwordErrors.new1 || passwordErrors.new2}
                    onClick={handleChangePassword} radius="full" color="primary">Save</Button>
            </CardBody>
        </Card>
    )
}
