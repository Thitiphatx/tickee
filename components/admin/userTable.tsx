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
import { Button, ButtonGroup } from '@nextui-org/button'
import { DeleteIcon, EditIcon } from "../icons";
import { RoleAvailable } from "@/types/data_type";
import Searchbar from "../searchbar";
import { useSession } from "next-auth/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import EditUserModal from "./editUserModal";

export default function UserTable({ data }: { data: User[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [roleType, setRoleType] = useState<string>(RoleAvailable.User);
    const [editForm, setEditForm] = useState<boolean>(false);
    const [mapData, setMapData] = useState<User | null>();
    const [outputRole, setOutputRole] = useState<string>("");
    const [onLoad, setOnLoad] = useState<boolean>(true);

    const { data: session, status } = useSession();

    if (data && onLoad) {
        setOnLoad(false)
    }

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
        setEditForm(true);
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let user_id: string = mapData?.id || "";
        try {
            const res = await fetch('/api/admin/delete', {
                method: 'POST',
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
            <EditUserModal data={mapData || null} role={outputRole} editForm={editForm} setEditForm={setEditForm}/>

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
