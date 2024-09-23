"use client"
import { IconGoogle } from "@/styles/icon";
import { signUpType } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [data, setData] = useState<signUpType>({
        email: "",
        password: "",
        repass: "",
        name: "",
    });

    const signUpUser = async (e:React.ChangeEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if (data.password !== data.repass) {
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
        }
    }

    return (
        <>
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <form onSubmit={signUpUser} className="space-y-2">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, email: e.target.value})} value={data.email} type="email" label="Email" />
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})} value={data.password} type="text" label="Password" />
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, repass: e.target.value})} value={data.repass} type="text" label="Re-password" />
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, name: e.target.value})} value={data.name} type="text" label="Name" />
                    <span className="auth-error">{error}</span>
                    <Button type="submit" color='primary' variant='shadow' className="uppercase w-full" radius="full" >sign in</Button>
                    <Divider className="my-3" />
                    <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'><IconGoogle />Sign in with Google</Button>
                </form>

            </motion.div>
        </>
    )
}
