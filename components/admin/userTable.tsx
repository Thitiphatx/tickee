"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import { motion } from 'framer-motion'
import { User } from "@prisma/client";
import React, { useState } from 'react'
import { Button, ButtonGroup } from '@nextui-org/button'
import { DeleteIcon, EditIcon } from "../icons";
import { RoleAvailable } from "@/types/data_type";
import Searchbar from "../searchbar";
import { useSession } from "next-auth/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input } from '@nextui-org/input'

export default function UserTable({ data }: { data: User[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen2, setOpen2] = useState<boolean>(false);
    const [roleType, setRoleType] = useState<string>(RoleAvailable.User);
    const [usersData, setUsersData] = useState<User[] | null>([]);
    const [mapData, setMapData] = useState<User | null>();
    const [outputRole, setOutputRole] = useState<string>("");
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [outputName, setOutputName] = useState<string>("");
    const [outputEmail, setOutputEmail] = useState<string>("");

    const { data: session, status } = useSession();

    if (data && onLoad) {
        setOnLoad(false)
    }

    const onOpen2 = () => {
        setOpen2(true)
    };

    const onClose2 = () => {
        setOpen2(false)
    };

    const roleSelection = (role: string) => {
        setRoleType(role)
    };

    const deleteClick = (item: User) => {
        setMapData(item)
        onOpen()
    };

    const editClick = (item: User) => {
        setMapData(item)
        setOutputRole(item.role)
        onOpen2()
    };

    const returnID = () => {
        if (mapData) {
            return mapData.id.toString()
        }
        return ""
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id: string = returnID();
        try {
            const res = await fetch('/api/admin/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, outputName, outputEmail, outputRole }),
            });

        } catch (error) {
            console.error('Error creating user:', error);
        }
        onClose2()
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let user_id: string = mapData?.id || "";
        try {
            const res = await fetch('/api/admin/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id }),
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
        onClose()
    };

    return (
        <div className="flex flex-col items-center gap-5">

            <Modal backdrop={"blur"} isOpen={isOpen2} onClose={onClose2}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Edit</ModalHeader>
                        <Divider />
                        <form onSubmit={handleEdit}>
                            <ModalBody className="px-5 py-6 gap-3">
                                <motion.div className="space-y-2"
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputEmail(e.target.value)} defaultValue={mapData?.email || ""} type="email" label="Email" />
                                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputName(e.target.value)} defaultValue={mapData?.name || ""} type="text" label="Name" />
                                    <div className="flex flex-col gap-3 p-5">
                                        <RadioGroup
                                            label="Role"
                                            value={outputRole}
                                            onValueChange={setOutputRole}
                                        >
                                            {Object.values(RoleAvailable).map((item: string) => (
                                                <Radio value={item}>{item}</Radio>
                                            ))}
                                        </RadioGroup>
                                        <p className="text-default-500 text-small">New Role : {outputRole}</p>
                                    </div>
                                </motion.div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>

            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Delete</ModalHeader>
                            <Divider />
                            <ModalBody className="px-10 py-6 gap-3">
                                <span className="uppercase font-semibold text-danger text-lg">Are You Sure ?</span>
                                <p className="text-md capitalize">
                                    <span>To Delete </span>
                                    <span className="underline underline-offset-2 text-danger">{mapData?.name}</span>
                                    <span> from User</span>
                                </p>
                                <p className="text-md capitalize">
                                    <span>No Return after this point</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" variant='solid' onClick={(e) => handleDelete(e)}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {!onLoad && (
                <>
                    <ButtonGroup className="w-1/3">
                        {Object.values(RoleAvailable).map((item: string) => (
                            <Button className="w-1/3 capitalize" variant="bordered" onClick={() => roleSelection(item)}>{item}</Button>
                        ))}
                    </ButtonGroup>

                    <div className="w-full">
                        <Searchbar />
                    </div>

                    <Table className="p-8" selectionMode="single" color="default" >
                        <TableHeader>
                            <TableColumn align="center">NAME</TableColumn>
                            <TableColumn align="center">EMAIL</TableColumn>
                            <TableColumn align="center">PHONE</TableColumn>
                            <TableColumn align="center">ROLE</TableColumn>
                            <TableColumn align="center">STATUS</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No Data for Display."}>
                            {data.filter((item: User) => (item.role == roleType && session?.user.id != item.id)).map((item: User) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
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
            )}
        </div>

    )
};
