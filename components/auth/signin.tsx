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
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<signInType>({
        email: "test@test.com",
        password: "123",
    });
    const [passwordInput, setPasswordInput] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async ()=> {
        try {
            setLoading(true);
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: "/"
            })
            if (response?.error) {
                setError("Invalid email or password");
                setPasswordInput(true);
            } else {
                router.push("/");
            }
        } catch (e) {
            setError("Something went wrong!!");
            setPasswordInput(true);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <div>
            <motion.div className="space-y-2"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, email: e.target.value})} value={data.email} type="email" label="Email" />
                <Input isInvalid={passwordInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({...data, password: e.target.value});
                    setPasswordInput(false);
                }} value={data.password} type="password" label="Password" />
                <span className="auth-error">{error}</span>
                <Button isLoading={loading} spinner={
                        <Spinner color="white" />
                    } isDisabled={passwordInput} onClick={handleSignIn} color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>

                <Divider className="my-3" />
                <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'><IconGoogle />Sign in with Google</Button>
            </motion.div>
        </div>
    )
}
