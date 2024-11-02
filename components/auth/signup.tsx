"use client"
import { IconGoogle } from "@/styles/icon";
import { signUpType } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignupForm() {
    const [validation, setValidation] = useState(
        {
            email: {
                regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                errorMsg: "กรุณากรอก email ให้ถูกต้อง",
                isError: false
            },
            password: {
                errorMsg: "",
                isError: false,
            },
            result: {
                errorMsg: "email หรือรหัสผ่านไม่ถูกต้อง",
                isError: false
            }
        }
    )
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<signUpType>({
        email: "",
        password: "",
        repass: "",
        name: "",
    });

    const signUpUser = async (e:React.ChangeEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setLoading(true);

        if (data.password !== data.repass) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                password: {
                    isError: true,
                    errorMsg: "รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน"
                },
            }));
            return;
        }

        const response = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data })
        });
    
        const result = await response.json();
        if (result.error) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: result.error
                },
            }));
        } else {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: false,
                    errorMsg: ""
                },
            }));
            signIn("credentials", {
                email: data.email,
                password: data.password,
            });
        }
        setLoading(false);
    }

    return (
        <>
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <form onSubmit={signUpUser} className="space-y-2">
                <Input isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, name: e.target.value})} value={data.name} type="text" label="Name" />
                    <Input isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, email: e.target.value})} value={data.email} type="email" label="Email" />
                    <Input isInvalid={validation.password.isError} isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})} value={data.password} type="text" label="Password" />
                    <Input isInvalid={validation.password.isError} errorMessage={validation.password.errorMsg} isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, repass: e.target.value})} value={data.repass} type="text" label="Re-password" />
                    {validation.result.isError && <span className="auth-error">{validation.result.errorMsg}</span>}
                    <Button isLoading={loading} spinner={
                        <Spinner color="white" size="sm"/>
                    } type="submit" color='primary' variant='shadow' className="uppercase w-full" radius="full" >sign in</Button>
                    <Divider className="my-3" />
                    <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'><IconGoogle />Sign in with Google</Button>
                </form>

            </motion.div>
        </>
    )
}
