"use client"
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DatePicker } from '@nextui-org/date-picker'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { Tab, Tabs } from '@nextui-org/tabs'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function AuthForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="bg-foreground bg-opacity-10">
                <h1 className="mx-auto text-3xl font-bold uppercase first-letter:text-primary-500">Tickee</h1>
            </CardHeader>
            <CardBody className="overflow-hidden">
                <Tabs size='lg' variant='bordered' fullWidth>
                    <Tab key="signIn" title="sign in" >
                        <motion.div className="space-y-2"
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} value={email} type="email" label="Email" />
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={password} type="password" label="Password" />
                            {(email !== "" && password !== "") ? 
                            <motion.div
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                            >
                                <Button color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>
                            </motion.div>
                            : (<></>)
                            }
                            
                            <Divider className="my-3" />
                            <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'>Sign in with Google</Button>
                        </motion.div>

                    </Tab>
                    <Tab key="signUp" title="sign up">
                        <motion.div className="space-y-2"
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} value={email} type="email" label="Email" />
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={password} type="password" label="Password" />
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={password} type="password" label="Re-password" />
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={password} type="text" label="First name" />
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={password} type="password" label="Last name" />
                            <DatePicker label="Birthday" />
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>
                            
                            <Divider className="my-3" />
                            <Button onClick={() => signIn("google")} className="bg-white text-black w-full" radius='full'>Sign in with Google</Button>
                        </motion.div>
                    </Tab>
                </Tabs>
            </CardBody>

        </Card>
    )
}
