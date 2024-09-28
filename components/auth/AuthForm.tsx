"use client"
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Tab, Tabs } from '@nextui-org/tabs'
import React from 'react'
import SigninForm from './signin'
import SignupForm from './signup'

export default function AuthForm() {
    

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="bg-foreground bg-opacity-10">
                <h1 className="mx-auto text-3xl font-bold uppercase first-letter:text-primary-500">Tickee</h1>
            </CardHeader>
            <CardBody className="overflow-hidden">
                <Tabs size='lg' variant='bordered' fullWidth>
                    <Tab key="signIn" title="sign in" >
                        <SigninForm />
                    </Tab>
                    <Tab key="signUp" title="sign up">
                        <SignupForm />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    )
}
