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
            password: {
                errorMsg: "",
                isError: false,
            },
            result: {
                errorMsg: "",
                isError: false,
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

        if (!data.email || !data.name || !data.password || !data.repass) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: "กรุณากรอกข้อมูลให้ครบถ้วน"
                },
            }));
            setLoading(false);
            return;
        }

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

    return (
        <>
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <form onSubmit={signUpUser} className="space-y-2">
                    <Input isRequired onChange={handleNameChange} isInvalid={validation.name.isError} errorMessage={validation.name.errorMsg} value={data.name} type="text" label="Name" />
                    <Input isRequired onChange={handleEmailChange} isInvalid={validation.email.isError} errorMessage={validation.email.errorMsg} value={data.email} type="email" label="Email" />
                    <Input isRequired isInvalid={validation.password.isError} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})} value={data.password} type="password" label="Password" />
                    <Input isRequired isInvalid={validation.password.isError} errorMessage={validation.password.errorMsg} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, repass: e.target.value})} value={data.repass} type="password" label="Re-password" />
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
