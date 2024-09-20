"use client"
import { signInType } from "@/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function SigninForm() {
    const [data, setData] = useState<signInType>({
        email: "test@test.com",
        password: "123",
    });

    const handleSignIn = async ()=> {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
    }

    return (
        <div>
            <motion.div className="space-y-2"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, email: e.target.value})} value={data.email} type="email" label="Email" />
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})} value={data.password} type="password" label="Password" />
                <Button onClick={handleSignIn} color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>

                <Divider className="my-3" />
                <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'>Sign in with Google</Button>
            </motion.div>
        </div>
    )
}
