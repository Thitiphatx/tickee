"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import { User } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DatePicker } from '@nextui-org/date-picker'
import { Input } from '@nextui-org/input'
import { motion } from 'framer-motion'
import { DeleteIcon, EditIcon } from "./icons";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { RoleAvailable } from "@/types/data_type";

export default function UserTable({ data }: { data: User[] }) {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [mapData, setMapData] = useState<User | null>();
    const [outputName, setOutputName] = useState<string>("");
    const [outputEmail, setOutputEmail] = useState<string>("");
    const [outputSurName, setOutputSurName] = useState<string>("");
    const [outputRole, setOutputRole] = useState<string>("");

    const deleteClick = (item: User) => {
        setMapData(item)
        setDeleteAlert(true);
    };

    const deleteClose = () => {
        setMapData(null)
        setDeleteAlert(false);
    };

    const editClick = (item: User) => {
        setMapData(item)
        setOutputRole(item.role)
        setEditForm(true);
    };

    const editClose = () => {
        setMapData(null)
        setEditForm(false);
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id:string = mapData?.id || "";
        try {
            const res = await fetch('/api/adminbutton/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_id,outputName,outputSurName,outputEmail,outputRole}),
            });

        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id:string = mapData?.id || "";
        try {
            const res = await fetch('/api/adminbutton/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_id}),
            });
            // const data = await res.json();
            console.log("test end")
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            {editForm && (
                <form onSubmit={handleEdit}>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={editClose}
                    />
                    <Card className="absolute z-20 w-2/5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Edit</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <motion.div className="space-y-2"
                                initial={{ y: 200, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputEmail(e.target.value)} value={mapData?.email || ""} type="email" label="Email" />
                                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputName(e.target.value)} value={mapData?.name || ""} type="text" label="First name" />
                                {/* <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputSurName(e.target.value)} value={mapData?.surname} type="text" label="Last name" /> */}
                                <div className="flex flex-col gap-3 p-5">
                                    <RadioGroup
                                        label="Role"
                                        value={outputRole}
                                        onValueChange={setOutputRole}
                                    >
                                        {Object.values(RoleAvailable).map((item : string) => (
                                            <Radio value={item}>{item}</Radio>
                                        ))}
                                    </RadioGroup>
                                    <p className="text-default-500 text-small">User: {outputRole}</p>
                                </div>
                                <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>

                            </motion.div>

                        </CardBody>

                    </Card>
                </form>
            )}

            {deleteAlert && (
                <form onSubmit={handleDelete}>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={deleteClose}
                    />
                    <Card className="absolute z-20 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Delete</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                                <span className="uppercase font-semibold text-xl">Are You Sure ?</span>
                                <p className="text-danger text-lg">
                                    <span>Delete </span>
                                    {mapData?.name}
                                    <span> from User ?</span>
                                </p>
                            </div>
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                        </CardBody>
                    </Card>
                </form>
            )}
            <Table className="p-8" selectionMode="single" color="default" >
                <TableHeader>
                    <TableColumn align="center">NAME</TableColumn>
                    <TableColumn align="center">EMAIL</TableColumn>
                    <TableColumn align="center">PHONE</TableColumn>
                    <TableColumn align="center">ROLE</TableColumn>
                    <TableColumn align="center">STATUS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Data for Display."}>
                    {data.map((item: User) => (
                        <TableRow key={item.id}>
                            <TableCell><span>{item.name} </span></TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.mobile}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-2 w-full">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon onClick={() => editClick(item)} />
                                    </span>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon onClick={() => deleteClick(item)} />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
};
