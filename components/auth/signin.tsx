"use client"
import { IconGoogle } from "@/styles/icon";
import { signInType } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninForm() {
    const [validation, setValidation] = useState(
        {
            email: {
                regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                errorMsg: "กรุณากรอก email ให้ถูกต้อง",
                isError: false
            },
            password: {
                regex: /^.+$/,
                errorMsg: "กรุณากรอก password",
                isError: false
            },
            result: {
                errorMsg: "email หรือรหัสผ่านไม่ถูกต้อง",
                isError: false
            }
        }
    )
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<signInType>({
        email: "",
        password: "",
    });

    const handleSignIn = async ()=> {
        if (data.email == "" || data.password == ""){
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: "กรุณากรอก email และรหัสผ่าน"
                },
            }));
            return
        } else if (validation.email.isError) {
            return
        }
        try {
            setLoading(true);
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: "/"
            })
            if (response?.error) {
                setValidation((prevValidation) => ({
                    ...prevValidation,
                    result: {
                        isError: true,
                        errorMsg: "email หรือรหัสผ่านไม่ถูกต้อง"
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
                router.push("/");
            }
        } catch (e) {
            setValidation((prevValidation) => ({
                ...prevValidation,
                result: {
                    isError: true,
                    errorMsg: "มีบางอย่างผิดพลาด"
                },
            }));
        } finally {
            setLoading(false);
        }
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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setData({...data, password: e.target.value})
        let newValidation = validation
        if (!validation.password.regex.test(e.target.value)) {
            newValidation.password.isError = true
        } else {
            newValidation.password.isError = false
        }
        setValidation(newValidation)
    }

    return (
        <div>
            <motion.div className="space-y-2"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <Input isRequired isInvalid={validation.email.isError} errorMessage={validation.email.errorMsg} onChange={handleEmailChange} value={data.email} type="email" label="Email" />
                <Input isRequired isInvalid={validation.password.isError} errorMessage={validation.password.errorMsg} onChange={handlePasswordChange} value={data.password} type="password" label="Password" />
                {validation.result.isError && <span className="auth-error">{validation.result.errorMsg}</span>}
                <Button isLoading={loading} spinner={
                        <Spinner color="white" size="sm"/>
                    } isDisabled={validation.email.isError && validation.password.isError && validation.result.isError} onClick={handleSignIn} color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>

                <Divider className="my-3" />
                <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'><IconGoogle />Sign in with Google</Button>
            </motion.div>
        </div>
    )
}
