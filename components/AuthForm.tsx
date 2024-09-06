"use client"
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { Tab, Tabs } from '@nextui-org/tabs'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function AuthForm() {
  return (
    <Card className="max-w-md mx-auto">
        <CardHeader className="bg-zinc-950">
            <h1 className="mx-auto text-3xl font-bold uppercase first-letter:text-primary-500">Tickee</h1>
        </CardHeader>
        <CardBody className="overflow-hidden">
            <Tabs size='lg' variant='bordered' fullWidth>
                <Tab key="signIn" title="sign in" >
                    <motion.div className="space-y-2"
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Input type="email" label="Email" />
                        <Input type="password" label="Password" />
                        <Button color='primary' variant='shadow' className="uppercase w-full" radius="full">sign in</Button>
                        <Divider className="my-3"/>
                        <Button onClick={()=> signIn("google")} className="bg-white text-black w-full" radius='full'>Sign in with Google</Button>
                    </motion.div>   
                    
                </Tab>
                <Tab key="signUp" title="sign up">
                    <Button onClick={()=> signIn("google")} className="bg-white text-black w-full" radius='full'>Sign up with Google</Button>
                </Tab>
            </Tabs>
        </CardBody>
        
    </Card>
  )
}
