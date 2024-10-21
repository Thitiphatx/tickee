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
    const [error, setError] = useState<string | null>(null);
    const [passwordErrors, setPasswordErrors] = useState(false);
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
            setPasswordErrors(true);
            setError("Password does not matching")
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
            setError(result.error);
        } else {
            setError(null);
            signIn("credentials", {
                email: data.email,
                password: data.password,
            });
        }
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
                    <Input isInvalid={passwordErrors} isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})} value={data.password} type="text" label="Password" />
                    <Input isInvalid={passwordErrors} isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, repass: e.target.value})} value={data.repass} type="text" label="Re-password" />
                    <span className="auth-error">{error}</span>
                    <Button isLoading={loading} spinner={
                        <Spinner />
                    } isDisabled={passwordErrors} type="submit" color='primary' variant='shadow' className="uppercase w-full" radius="full" >sign in</Button>
                    <Divider className="my-3" />
                    <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'><IconGoogle />Sign in with Google</Button>
                </form>

            </motion.div>
        </>
    )
}
